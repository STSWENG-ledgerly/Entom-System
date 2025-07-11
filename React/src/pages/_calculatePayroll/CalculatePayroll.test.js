import { calculatePayroll } from './CalculatePayroll';

describe('calculatePayroll', () => {
  const config = {
    rate: 100,
    basic: 10000,
  };

  const payrollInfo = {
    ot: 5,                
    salaryIncrease: 200,
    mealAllow: 100,
    bdayBonus: 300,
    incentive: 150,
    otherPayrollInfo: 50,
  };

  // Test data will change depending on other stuff
  const deductions = {
    sss: 300,
    philhealth: 200,
    pagibig: 100,
    cashAdvance: 50,
    healthCard: 150,
    absences: 200,
    otherDeductions: 100,
  };

  it('correctly calculates payroll, deductions, and total', () => {
    const result = calculatePayroll(payrollInfo, deductions, config);

    const expectedPayroll = 
      (5 * 100) + 200 + 100 + 300 + 150 + 50 + 10000; // 11300
    const expectedDeductions = 
      300 + 200 + 100 + 50 + 150 + 200 + 100; // 1100
    const expectedTotal = expectedPayroll - expectedDeductions; // 10200

    expect(result.payroll).toBeCloseTo(expectedPayroll);
    expect(result.deductions).toBeCloseTo(expectedDeductions);
    expect(result.total).toBeCloseTo(expectedTotal);
  });
});
