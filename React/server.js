// const SERVER_PORT = 8000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Employee, Attendance, Payroll, Account, Company, Config } = require('./models/payrollSchema');
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
  const { company } = req.query;
  try {
    const employees = await Employee.find({ company });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// GET all payrolls for a given employee_id (your front-end is calling /payments/111)
app.get('/payments/:employee_id', async (req, res) => {
  try {
    // 1) find the employee document by your custom ID
    const employee = await Employee.findOne({ employee_id: req.params.employee_id });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // 2) find all non-deleted payrolls for that employee
    const payments = await Payroll.find({
      employee:   employee._id,
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
    const payment = await Payroll.findById(req.params.payment_id).lean();
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    payment.formatted_date = new Date(payment.payDate).toISOString().slice(0, 10);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

app.post('/deletePayment/:payment_id', async (req, res) => {
  try {
    await Payroll.findByIdAndUpdate(req.params.payment_id, { isDeleted: true });
    res.json({ message: 'Payment marked as deleted' });
  } catch (err) {
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
      employee_index_id, rate, basic, payrollInfo, deductions, results
    } = req.body;

    await Payroll.findByIdAndUpdate(req.params.payment_id, {
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

    res.json({ message: 'Payment updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

app.post('/addPayment', async (req, res) => {
  try {
    const {
      employee,
      payDate,
      payrollTimeframe,
      allowances,
      grossSalary,
      deductions,
      totalDeductions,
      total,
      paymentMode,
      payslipId,
      isApproved,
      dateGenerated,
      isDeleted
    } = req.body;

    const exists = await Payroll.findOne({ payslipId });
      if (exists) {
        return res.status(400).json({ error: "Duplicate payslipId. Payment already exists." });
      }


    let employeeRef = employee;
    if (!mongoose.Types.ObjectId.isValid(employee)) {
      const empDoc = await Employee.findOne({ employee_id: employee });
      if (!empDoc) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      employeeRef = empDoc._id;
    }

    const newPayroll = new Payroll({
      employee:         employeeRef,
      payDate:          new Date(payDate),
      payrollTimeframe,
      allowances,
      grossSalary,
      deductions,
      totalDeductions,
      total,
      paymentMode,
      payslipId,
      isApproved,
      dateGenerated:    new Date(dateGenerated),
      isDeleted
    });

    const saved = await newPayroll.save();
    res.status(201).json({ message: 'Payment added successfully', id: saved._id });
  } catch (err) {
    console.error('Error in POST /addPayment:', err);
    res.status(500).json({ error: 'Failed to add payment', details: err.message });
  }
});


// Added new Routes

app.get('/getAdminAccount', async (req, res) => {
  try {
    const { username } = req.query;
    
    const admin = await Account.findOne({ username, role: 'Administrator', isDeleted: false });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    res.json({ username: admin.username, password: admin.passwordHash, company: admin.company});
  } catch (error) {
    console.error("Server: Error fetching admin account", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getEmployeeDetails/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ employee_id: req.params.id }).lean();
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


// app.listen(SERVER_PORT, () => {
//   console.log(`Listening on port ${SERVER_PORT}`);
// });

app.listen(port, async function() {
    await database(); 
    console.log(`Server: Running on http://localhost:${port}`);
});