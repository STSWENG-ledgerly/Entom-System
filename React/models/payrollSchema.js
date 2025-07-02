const mongoose = require('mongoose');
const { Schema } = mongoose;

// Employee Schema
const employeeSchema = new Schema({
  employeeId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  designation: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  bankAccount: {
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    branch: { type: String }
  },
  dateHired: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rbacProfile: { type: Number, required: true }
}, { timestamps: true });

// Attendance Schema
const attendanceSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  hoursWorked: { type: Number, required: true },
  overtimeHours: { type: Number, default: 0 },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'Account' }
}, { timestamps: true });

// Payroll Schema
const payrollSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  payDate: { type: Date, required: true },
  payrollTimeframe: { type: String, enum: ['Weekly', 'Bi-Monthly', 'Monthly'], required: true },
  allowances: {
    mealAllowance: { type: Number, default: 0 },
    birthdayBonus: { type: Number, default: 0 },
    incentives: { type: Number, default: 0 },
    otherAdditions: { type: Number, default: 0 }
  },
  overtimeDetails: [{
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true }
  }],
  grossSalary: { type: Number, required: true },
  deductions: {
    tax: { type: Number, default: 0 },
    sss: { type: Number, default: 0 },
    philHealth: { type: Number, default: 0 },
    pagIbig: { type: Number, default: 0 },
    healthCard: { type: Number, default: 0 },
    cashAdvance: { type: Number, default: 0 },
    lateAbsent: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 }
  },
  totalDeductions: { type: Number, required: true },
  netPay: { type: Number, required: true },
  paymentMode: { type: String, enum: ['Bank Transfer', 'Cash', 'Check'], default: 'Bank Transfer' },
  payslipId: { type: String, required: true, unique: true },
  isApproved: { type: Boolean, default: false },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'Account' },
  dateGenerated: { type: Date, default: Date.now }
}, { timestamps: true });

// Account Schema
const accountSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['Administrator', 'Employee'], default: 'Employee' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Config Schema (for rate settings)
const configSchema = new Schema({
  standardRate: { type: Number, default: 0 },
  holidayRate: { type: Number, default: 0 },
  weekendRate: { type: Number, default: 0 }
});

// Models
const Employee = mongoose.model('Employee', employeeSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Payroll = mongoose.model('Payroll', payrollSchema);
const Account = mongoose.model('Account', accountSchema);
const Config = mongoose.model('Config', configSchema);

module.exports = {
  Employee,
  Attendance,
  Payroll,
  Account,
  Config
};
