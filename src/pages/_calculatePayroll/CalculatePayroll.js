export const calculatePayroll = (payrollInfo = {}, deductions = {}, config = {}) => {
  const toNumber = (val) => parseFloat(val) || 0;

  // Destructure config defaults
  const basic = toNumber(config.basic);
  const rate = toNumber(config.rate);
  const workingDays = toNumber(config.workingDaysPerMonth) || 22;   // Default: 22 working days/month
  const workHoursPerDay = toNumber(config.workHoursPerDay) || 8;    // Default: 8 hours/day

  // Derived rates
  const hourlyRate = basic / (workingDays * workHoursPerDay);
  const dailyRate = basic / workingDays;

  // Allowances and Additions
  const otPay = toNumber(payrollInfo.ot) * rate;
  const meal = toNumber(payrollInfo.mealAllow);
  const bday = toNumber(payrollInfo.bdayBonus);
  const incent = toNumber(payrollInfo.incentive);
  const otherAdd = toNumber(payrollInfo.otherPayrollInfo);

  const payroll_total = otPay + meal + bday + incent + otherAdd + basic;

  // Deductions
  const tax = toNumber(deductions.tax);
  const sss = toNumber(deductions.sss);
  const philHealth = toNumber(deductions.philHealth);
  const pagIbig = toNumber(deductions.pagIbig);
  const cashAdvance = toNumber(deductions.cashAdvance);
  const healthCard = toNumber(deductions.healthCard);
  const lateHours = toNumber(deductions.lateHours);
  const absentDays = toNumber(deductions.absentDays);
  const otherDeductions = toNumber(deductions.otherDeductions);

  // Computed deductions for lateness and absence
  const lateDeduction = lateHours * hourlyRate;
  const absentDeduction = absentDays * dailyRate;

  const deductions_total =
    tax +
    sss +
    philHealth +
    pagIbig +
    cashAdvance +
    healthCard +
    lateDeduction +
    absentDeduction +
    otherDeductions;

  const total = payroll_total - deductions_total;

  return {
    payroll: payroll_total,
    deductions: deductions_total,
    total: total,
    overtimeDetails: {
      hours: toNumber(payrollInfo.ot),
      rate: rate,
      total: otPay,
    },
  };
};
