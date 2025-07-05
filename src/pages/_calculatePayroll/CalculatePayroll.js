export const calculatePayroll = (payrollInfo = {}, deductions = {}, config = {}) => {
  const toNumber = (val) => parseFloat(val) || 0;

  // Allowances and Additions
  const otPay = toNumber(payrollInfo.ot) * toNumber(config.rate);
  const meal = toNumber(payrollInfo.mealAllow);
  const bday = toNumber(payrollInfo.bdayBonus);
  const incent = toNumber(payrollInfo.incentive);
  const otherAdd = toNumber(payrollInfo.otherPayrollInfo);
  const basic = toNumber(config.basic);

  const payroll_total = otPay + meal + bday + incent + otherAdd + basic;

  // Deductions
  const tax = toNumber(deductions.tax);
  const sss = toNumber(deductions.sss);
  const philHealth = toNumber(deductions.philHealth);
  const pagIbig = toNumber(deductions.pagIbig);
  const cashAdvance = toNumber(deductions.cashAdvance);
  const healthCard = toNumber(deductions.healthCard);
  const lateAbsent = toNumber(deductions.lateAbsent);
  const otherDeductions = toNumber(deductions.otherDeductions);

  const deductions_total =
    tax + sss + philHealth + pagIbig + cashAdvance + healthCard + lateAbsent + otherDeductions;

  const total = payroll_total - deductions_total;

  // Debug logs
  console.log("🧾 Overtime Pay:", otPay);
  console.log("🧾 Meal Allowance:", meal);
  console.log("🧾 Birthday Bonus:", bday);
  console.log("🧾 Incentive:", incent);
  console.log("🧾 Other Additions:", otherAdd);
  console.log("🧾 Basic Salary:", basic);
  console.log("✅ Payroll Total:", payroll_total);

  console.log("➖ Tax:", tax);
  console.log("➖ SSS:", sss);
  console.log("➖ PhilHealth:", philHealth);
  console.log("➖ Pag-IBIG:", pagIbig);
  console.log("➖ Cash Advance:", cashAdvance);
  console.log("➖ Health Card:", healthCard);
  console.log("➖ Late/Absent:", lateAbsent);
  console.log("➖ Other Deductions:", otherDeductions);
  console.log("✅ Deductions Total:", deductions_total);

  console.log("💰 Net Total:", total);

  return {
    payroll: payroll_total,
    deductions: deductions_total,
    total: total,
    overtimeDetails: {
      hours: toNumber(payrollInfo.ot),
      rate: toNumber(config.rate),
      total: toNumber(payrollInfo.ot) * toNumber(config.rate),
    },
  };
};
