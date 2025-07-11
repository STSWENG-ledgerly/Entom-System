
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
