// const SERVER_PORT = 8000;
const express = require('express');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
const bcrypt = require('bcrypt');
>>>>>>> Stashed changes
=======
const bcrypt = require('bcrypt');
>>>>>>> Stashed changes
const mongoose = require('mongoose');
const cors = require('cors');
const { Employee, Attendance, Payroll, Account, Config } = require('./models/payrollSchema');
const connectToMongo = require('./src/scripts/conn.js');
const populateDatabase = require("./models/populatePayroll.js");
require('dotenv').config();

const port = process.env.SERVER_PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/payrollSystem', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

async function database() {
  try {
    await connectToMongo();
  } catch (error) {
    console.error('Server: Failed to start server', error);
  }
}

app.get('/', (req, res) => {
  res.json("from backend side");
});

app.get('/employee', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

app.get('/payments/:employee_id', async (req, res) => {
  const payments = await Payment.find({
    employee_id: req.params.employee_id,
    isDeleted: false
  }).lean();

  payments.forEach(p => {
    p.formatted_date = new Date(p.payDate).toISOString().slice(0, 10);
  });

<<<<<<< Updated upstream
  res.json(payments);
});

=======
    const employee = await Employee.findOne({
      employee_id: req.params.employee_id,
      company
    });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // 2) find all non-deleted payrolls for that employee
    const payments = await Payroll.find({
      employee: employee._id,
      isDeleted: false
    })
      .lean();

    // 3) format the date for each
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

    // Ensure the payment belongs to an employee in the same company
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
>>>>>>> Stashed changes

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

app.get('/getPayment/:payment_id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.payment_id).lean();
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    payment.formatted_date = new Date(payment.payDate).toISOString().slice(0, 10);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

app.post('/deletePayment/:payment_id', async (req, res) => {
  try {
    await Payment.findByIdAndUpdate(req.params.payment_id, { isDeleted: true });
    res.json({ message: 'Payment marked as deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete payment' });
  }
});

app.post("/saveConfig", async (req, res) => {
  try {
    const { rate, basic } = req.body;
    const config = await PayrollAppConfig.findOne();
    if (config) {
      config.rate = rate;
      config.basic = basic;
      await config.save();
      res.status(200).json({ message: "Configuration updated", config });
    } else {
      await PayrollAppConfig.create({ rate, basic });
    }
    res.json({ message: "Configuration saved" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/getConfig', async (req, res) => {
  try {
    const config = await Config.find({});
    if (!config || config.length === 0) {
      return res.status(404).json({ error: 'Config not found' });
    }
    res.json(config);
  } catch (error) {
    console.error("Server: Error fetching config", error);
    res.status(500).json({ error: 'Internal server error' });
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
<<<<<<< Updated upstream
      employee_index_id, rate, basic, payrollInfo, deductions, results
=======
      payrollInfo = {},
      deductions = {},
      grossSalary,
      totalDeductions,
      total,
      overtimeDetails = {},
      payDate,
      paymentMode = 'Bank Transfer',
      isApproved = true
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    } = req.body;

    await Payment.findByIdAndUpdate(req.params.payment_id, {
      employee_index_id,
      payDate: new Date(payrollInfo.date),
      rate,
      basic,
      overtimeDays: payrollInfo.ot,
      salaryIncrease: payrollInfo.salaryIncrease,
      mealAllowance: payrollInfo.mealAllow,
      birthdayBonus: payrollInfo.bdayBonus,
      incentive: payrollInfo.incentive,
      otherAdditions: payrollInfo.otherPayrollInfo,
      sss: deductions.sss,
      philHealth: deductions.philhealth,
      pagIbig: deductions.pagibig,
      cashAdvance: deductions.cashAdvance,
      healthCard: deductions.healthCard,
      lateAbsent: deductions.absences,
      otherDeductions: deductions.otherDeductions,
      payroll: results.payroll,
      deductions: results.deductions,
      total: results.total
    });

<<<<<<< Updated upstream
    res.json({ message: 'Payment updated' });
=======
    // validate & parse the date
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

    // perform the update
    const updated = await Payroll.findByIdAndUpdate(
      req.params.payment_id,
      update,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Payroll not found' });
    }

    res.json({ message: 'Payment updated', updated });
>>>>>>> Stashed changes
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

app.post('/addPayment', async (req, res) => {
  try {
    const {
      employee_id, rate, basic, payrollInfo, deductions, results
    } = req.body;

<<<<<<< Updated upstream
    const newPayment = new Payment({
      employee_id,
      payDate: new Date(payrollInfo.date),
      rate,
      basic,
      overtimeDays: payrollInfo.ot,
      salaryIncrease: payrollInfo.salaryIncrease,
      mealAllowance: payrollInfo.mealAllow,
      birthdayBonus: payrollInfo.bdayBonus,
      incentive: payrollInfo.incentive,
      otherAdditions: payrollInfo.otherPayrollInfo,
      sss: deductions.sss,
      philHealth: deductions.philhealth,
      pagIbig: deductions.pagibig,
      cashAdvance: deductions.cashAdvance,
      healthCard: deductions.healthCard,
      lateAbsent: deductions.absences,
      otherDeductions: deductions.otherDeductions,
      payroll: results.payroll,
      deductions: results.deductions,
      total: results.total,
      isDeleted: false
=======
    if (!company) {
      return res.status(400).json({ error: 'Missing company in request' });
    }

    const emp = await Employee.findOne({ employee_id: employee, company }).lean();
    if (!emp) {
      return res.status(400).json({ error: `Employee ${employee} not found in company ${company}` });
    }

    // Duplication check
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
>>>>>>> Stashed changes
    });

    const saved = await newPayment.save();
    res.status(201).json({ message: "Payment added successfully", id: saved._id });
  } catch (err) {

    res.status(500).json({ error: 'Failed to add payment', details: err.message });
  }
});


// Added new Routes

app.get('/getAdminAccount', async (req, res) => {
  try {
    const admin = await Account.findOne({ role: 'Administrator', isDeleted: false });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    res.json({ username: admin.username, password: admin.passwordHash });
  } catch (error) {
    console.error("Server: Error fetching admin account", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

<<<<<<< Updated upstream

=======
app.get('/getEmployeeDetails/:id', async (req, res) => {
  try {
    const { id } = req.params;

    let employee = null;

    // only call findById if 'id' is a 24-char hex string
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

    // validate company _id
    if (!mongoose.Types.ObjectId.isValid(company)) {
      return res.status(400).json({ error: 'Invalid company ID' });
    }

    const workingDaysInMonth = 22;      // adjust to your policy
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
>>>>>>> Stashed changes
// app.listen(SERVER_PORT, () => {
//   console.log(`Listening on port ${SERVER_PORT}`);
// });

app.listen(port, async function() {
  await database();
  console.log(`Server: Running on http://localhost:${port}`);
});
