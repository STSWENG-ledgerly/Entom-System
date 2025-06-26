const mongoose = require("mongoose");
const { Schema } = mongoose;

// Employee Schema
const employeeSchema = new Schema({
  employee_id: { type: String, required: true },
  status: { type: Boolean, required: true },
  fname: { type: String, required: true },
  mname: { type: String, required: true },
  lname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  position: { type: String, required: true },
  date_hired: { type: Date, required: true },
  rbacProfile: { type: Number, required: true }
});

// Payment Schema
const paymentSchema = new Schema({
  employee_id: { type: String, required: true },
  payDate: { type: Date, required: true },
  rate: { type: Number, required: true },
  basic: { type: Number, required: true },
  overtimeDays: { type: Number, required: true },
  salaryIncrease: { type: Number, required: true },
  mealAllowance: { type: Number, required: true },
  birthdayBonus: { type: Number, required: true },
  incentive: { type: Number, required: true },
  otherAdditions: { type: Number, required: true },
  sss: { type: Number, required: true },
  philHealth: { type: Number, required: true },
  pagIbig: { type: Number, required: true },
  cashAdvance: { type: Number, required: true },
  healthCard: { type: Number, required: true },
  lateAbsent: { type: Number, required: true },
  otherDeductions: { type: Number, required: true },
  payroll: { type: Number, required: true },
  deductions: { type: Number, required: true },
  total: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true }
});

// Payroll App Config Schema
const payrollAppConfigSchema = new Schema({
  password: { type: String, required: true },
  rate: { type: Number, required: true },
  basic: { type: Number, required: true }
});

// Models
const Employee = mongoose.model("Employee", employeeSchema);
const Payment = mongoose.model("Payment", paymentSchema);
const PayrollAppConfig = mongoose.model("PayrollAppConfig", payrollAppConfigSchema);

// Export all models
module.exports = {
  Employee,
  Payment,
  PayrollAppConfig
};