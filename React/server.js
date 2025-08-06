const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const { Employee, Payroll, Account, Company, Config } = require("./models/payrollSchema.js");
const connectToMongo = require('./src/scripts/conn.js');
const populateDatabase = require("./models/populatePayroll.js");
require('dotenv').config();

const port = 4000;

const app = express();
app.use(cors());
app.use(express.json());

async function database() {
  try {
    await connectToMongo();
    await populateDatabase();
  } catch (error) {
    console.error('Server: Failed to start server', error);
  }
}

async function hashPassword(password){
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      } catch (error) {
        console.error('Error hashing password:', error);
      }
}

async function checkPassword(sentPassword, passwordFromDB) {
    try {
        return await bcrypt.compare(sentPassword, passwordFromDB);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}

app.get('/', (req, res) => {
  res.json("from backend side");
});

// FIXED: Updated to use companyID directly
// FIXED: Updated to use companyID directly and handle ObjectId format
app.get('/employee', async (req, res) => {
  const { company: companyId } = req.query; 

  
  if (!companyId) {
    return res.status(400).json({ error: 'Company ID is required' });
  }


  try {
    // Try both string and ObjectId formats to handle any inconsistencies
    const employees = await Employee.find({ 
      $and: [
        {
          $or: [
            { company: companyId },  // String format
            { company: new mongoose.Types.ObjectId(companyId) }  // ObjectId format
          ]
        },
        { 
          $or: [
            { isDeleted: false },
            { isDeleted: { $exists: false } }
          ]
        }
      ]
    }).lean();
    
    res.json(employees);
  } catch (err) {
    console.error("Error in GET /employee:", err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

app.get('/payments/:employee_id', async (req, res) => {
  try {
    const { company } = req.query;

    if (!company) {
      return res.status(400).json({ error: 'Missing company parameter' });
    }

    const employee = await Employee.findOne({
      employee_id: req.params.employee_id,
      company
    });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const payments = await Payroll.find({
      employee: employee._id,
      isDeleted: false
    }).lean();

    payments.forEach(p => {
      p.formatted_date = p.payDate.toISOString().slice(0, 10);
    });

    res.json(payments);
  } catch (err) {
    console.error("Error in GET /payments/:employee_id:", err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

app.get('/getPayment/:payment_id', async (req, res) => {
  try {
    const { company } = req.query;

    const payment = await Payroll.findById(req.params.payment_id).lean();
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const employeeBelongs = await Employee.exists({
      _id: payment.employee,
      company: company
    });

    if (!employeeBelongs) {
      return res.status(403).json({ error: 'Access denied' });
    }

    payment.formatted_date = new Date(payment.payDate).toISOString().slice(0, 10);
    res.json(payment);
  } catch (err) {
    console.error("Error in GET /getPayment/:payment_id:", err);
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

app.post('/deletePayment/:payment_id', async (req, res) => {
  try {
    const { company } = req.query;
    if (!company) {
      return res.status(400).json({ error: 'Missing company parameter' });
    }

    const payment = await Payroll.findById(req.params.payment_id).lean();
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const employeeBelongs = await Employee.exists({
      _id: payment.employee,
      company: company
    });
    if (!employeeBelongs) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Payroll.findByIdAndUpdate(req.params.payment_id, { isDeleted: true });
    res.json({ message: 'Payment marked as deleted' });
  } catch (err) {
    console.error("Error in POST /deletePayment/:payment_id:", err);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
});

app.post("/getEmail", async (req, res) => {
  try {
    const employee = await Employee.findOne({ employee_id: req.body.employee_index_id });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json([{ email: employee.email }]);
  } catch (err) {
    console.error("Error in /getEmail:", err);
    res.status(500).json(err);
  }
});

app.post('/savePassword', async (req, res) => {
  try {
    const { password } = req.body;
    await PayrollAppConfig.findOneAndUpdate({}, { password }, { upsert: true });
    res.json({ message: 'Password saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save password' });
  }
});

app.post('/editPayment/:payment_id', async (req, res) => {
  try {
    const {
      payrollInfo = {},
      deductions = {},
      grossSalary,
      totalDeductions,
      total,
      overtimeDetails = {},
      payDate,
      paymentMode = 'Bank Transfer',
      isApproved = true
    } = req.body;

    console.log('⛔ payload.payrollInfo:', req.body.payrollInfo);
    console.log('⛔ payload.deductions: ', req.body.deductions);

    const parsed = new Date(payDate);
    if (isNaN(parsed)) {
      return res.status(400).json({ error: 'Invalid payDate' });
    }

    const update = {
      $set: {
        payDate: parsed,
        allowances: {
          overtimePay: overtimeDetails.total,
          mealAllowance: payrollInfo.mealAllow,
          birthdayBonus: payrollInfo.bdayBonus,
          incentives: payrollInfo.incentive,
          otherAdditions: payrollInfo.otherPayrollInfo
        },
        grossSalary,
        deductions: {
          tax: 0,
          sss: deductions.sss,
          philHealth: deductions.philHealth,
          pagIbig: deductions.pagIbig,
          healthCard: deductions.healthCard,
          cashAdvance: deductions.cashAdvance,
          lateHours: deductions.lateHours,
          absentDays: deductions.absentDays,
          otherDeductions: deductions.otherDeductions
        },
        totalDeductions,
        total,
        overtimeDetails,
        paymentMode,
        isApproved
      }
    };

    const updated = await Payroll.findByIdAndUpdate(
      req.params.payment_id,
      update,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Payroll not found' });
    }

    res.json({ message: 'Payment updated', updated });
  } catch (err) {
    console.error("❌ EditPayment Error:", err);
    res.status(500).json({ error: 'Failed to update payment', details: err.message });
  }
});

app.post('/addPayment', async (req, res) => {
  try {
    const {
      employee, payDate, payrollTimeframe,
      overtimeDetails = {},
      allowances, deductions, grossSalary,
      totalDeductions, total, paymentMode,
      payslipId, isApproved, isDeleted, dateGenerated,
      company
    } = req.body;

    if (!company) {
      return res.status(400).json({ error: 'Missing company in request' });
    }

    const emp = await Employee.findOne({ employee_id: employee, company }).lean();
    if (!emp) {
      return res.status(400).json({ error: `Employee ${employee} not found in company ${company}` });
    }

    const exists = await Payroll.findOne({ payslipId });
    if (exists) {
      return res.status(400).json({ error: "Duplicate payslipId. Payment already exists." });
    }

    const newPayment = new Payroll({
      employee: emp._id,
      overtimeDetails,
      payDate,
      payrollTimeframe,
      allowances,
      deductions,
      grossSalary,
      totalDeductions,
      total,
      paymentMode,
      payslipId,
      isApproved,
      isDeleted,
      dateGenerated
    });

    const saved = await newPayment.save();
    res.status(201).json({ message: "Payment added successfully", id: saved._id });

  } catch (err) {
    console.error("Error in POST /addPayment:", err);
    res.status(500).json({ error: 'Failed to add payment', details: err.message });
  }
});

app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Account.findOne({
      username,
      role: 'Administrator',
      isDeleted: false
    }).populate('company');

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
   
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ username: admin.username, company: {name: admin.company.name, id: admin.company._id}});
  } catch (err) {
    console.error("Error in POST /admin/login:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/changePassword', async (req, res) => {
  try {
    const { username, oldPass, newPass } = req.body;
    const account = await Account.findOne({ username: username });
    const comparePass = await checkPassword(oldPass, account.passwordHash);

    if(!comparePass){
      return res.status(401).send("Wrong old password");
    }

    if( oldPass == newPass ){
      return res.status(402).send("Same password");
    }

    const hashedPassword = await hashPassword(newPass);
    account.passwordHash = hashedPassword;
    await account.save();
    return res.status(200).send("Success");
  } catch (error) {
    console.error("Error in POST /changePassword:", error);
    return res.status(500).send("Server Error");
  }
});

// FIXED: Remove duplicate routes - keep only one
app.post('/admin/register', async (req, res) => {
  try {
    const { username, password, company } = req.body;
    if (!username || !password || !company) {
      return res.status(400).json({ error: 'username, password and company are all required' });
    }

    const userExists = await Account.findOne({
      username: { $regex: `^${username}$`, $options: 'i' }
    });
    if (userExists) {
      return res.sendStatus(409);
    }

    const hashedPassword = await hashPassword(password);
    const companyDoc = await Company
      .findOne({ name: company })
      .collation({ locale: 'en', strength: 2 })
      .select('_id');
    const account = new Account({ username: username, passwordHash: hashedPassword, company: companyDoc });

    await account.save();

    return res.status(201).json({
      username: account.username,
      company: account.company
    });
  } catch (err) {
    console.error("Error in POST /admin/register:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// FIXED: Remove duplicate - keep only one
app.get('/getEmployeeDetails/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let employee = null;

    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      employee = await Employee.findById(id).lean();
    }

    if (!employee) {
      employee = await Employee.findOne({ employee_id: req.params.id }).lean();
    }

    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    res.json({
      basicSalary: employee.basicSalary,
      overtimeRate: employee.overtimeRate,
    });
  } catch (err) {
    console.error("Error fetching employee details:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/addEmployee', async (req, res) => {
  try {
    const {
      employee_id,
      company,
      status = 'Active',
      fname,
      middleName = '',
      lname,
      department,
      position,
      designation,
      basicSalary,
      bankAccount: {
        bankName,
        accountNumber,
        branch = ''
      },
      dateHired,
      phone,
      email,
      rbacProfile
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(company)) {
      return res.status(400).json({ error: 'Invalid company ID' });
    }

    const workingDaysInMonth = 22;
    const workHoursPerDay = 8;
    const overtimeMultiplier = 1.25;

    const dailyRate = basicSalary / workingDaysInMonth;
    const hourlyRate = dailyRate / workHoursPerDay;
    const overtimeRate = hourlyRate * overtimeMultiplier;

    const newEmployee = new Employee({
      employee_id,
      company: new mongoose.Types.ObjectId(company),
      status,
      fname,
      middleName,
      lname,
      department,
      position,
      designation,
      basicSalary,
      overtimeRate,
      bankAccount: {
        bankName,
        accountNumber,
        branch
      },
      dateHired: new Date(dateHired),
      phone,
      email,
      rbacProfile
    });

    const saved = await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', id: saved._id });
  } catch (err) {
    console.error('Error in POST /addEmployee:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/editEmployee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee', details: error.message });
  }
});

app.listen(port, async function() {
  await database();
  console.log(`Server: Running on http://localhost:${port}`);
});