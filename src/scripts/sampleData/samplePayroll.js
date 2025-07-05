// samplePayroll.js
const { Employee } = require("../../../models/payrollSchema.js");

async function getSamplePayroll() {
  const emp = await Employee.findOne({ employee_id: "111" }).exec();
  if (!emp) throw new Error("No employee with ID 111");

  return [
    {
      employee: emp._id,
      payDate: new Date("2024-10-16"),
      payrollTimeframe: "Monthly",
      allowances: {
        mealAllowance: 0,
        birthdayBonus: 0,
        incentives: 0,
        otherAdditions: 0
      },
      overtimeDetails: [],
      grossSalary: 8385,
      deductions: {
        tax: 0,
        sss: 0,
        philHealth: 0,
        pagIbig: 0,
        healthCard: 0,
        cashAdvance: 0,
        lateAbsent: 0,
        otherDeductions: 0
      },
      totalDeductions: 0,
      netPay: 8385,
      paymentMode: "Bank Transfer",
      payslipId: "PS111-20241016",
      isApproved: true,
      dateGenerated: new Date("2024-10-16")
    }
  ];
}

module.exports = { getSamplePayroll };
