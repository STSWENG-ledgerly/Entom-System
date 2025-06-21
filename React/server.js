const SERVER_PORT = 8000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Employee, Payment, PayrollAppConfig } = require('./models/payrollSchema');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/payrollSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

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

  res.json(payments);
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
    } else {
      await PayrollAppConfig.create({ rate, basic });
    }
    res.json({ message: "Configuration saved" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/getConfig", async (req, res) => {
  try {
    const config = await PayrollAppConfig.findOne();
    res.json(config);
  } catch (err) {
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
      employee_index_id, rate, basic, payrollInfo, deductions, results
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

    res.json({ message: 'Payment updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

app.post('/addPayment', async (req, res) => {
  try {
    const {
      employee_id, rate, basic, payrollInfo, deductions, results
    } = req.body;

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
    });

    const saved = await newPayment.save();
    res.status(201).json({ message: "Payment added successfully", id: saved._id });
  } catch (err) {

    res.status(500).json({ error: 'Failed to add payment', details: err.message });
  }
});



app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
