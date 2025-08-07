import { calculatePayroll } from './CalculatePayroll';

describe('calculatePayroll', () => {
  const config = {
    rate: 100,
    basic: 10000,
  };

  const basePayrollInfo = {
    ot: 5,
    salaryIncrease: 200,
    mealAllow: 100,
    bdayBonus: 300,
    incentive: 150,
    otherPayrollInfo: 50,
  };

  const baseDeductions = {
    sss: 200,
    philhealth: 100,
    pagibig: 50,
    cashAdvance: 300,
    healthCard: 250,
    absences: 400,
    otherDeductions: 0,
  };

  it('calculates payroll, deductions, and total correctly (normal case)', () => {
    const result = calculatePayroll(basePayrollInfo, baseDeductions, config);
    expect(result.payroll).toBe(10000 + (5 * 100) + 200 + 100 + 300 + 150 + 50); // 11,300
    expect(result.deductions).toBe(200 + 100 + 50 + 300 + 250 + 400 + 0); // 1300
    expect(result.total).toBe(11300 - 1300); // 10,000
  });

  it('returns correct values with zero OT and no bonuses', () => {
    const payrollInfo = { ...basePayrollInfo, ot: 0, bdayBonus: 0, incentive: 0 };
    const result = calculatePayroll(payrollInfo, baseDeductions, config);
    const expectedPayroll = 10000 + 200 + 100 + 0 + 0 + 50;
    expect(result.payroll).toBe(expectedPayroll);
  });

  it('handles all zeros (edge case)', () => {
    const result = calculatePayroll(
      {
        ot: 0,
        salaryIncrease: 0,
        mealAllow: 0,
        bdayBonus: 0,
        incentive: 0,
        otherPayrollInfo: 0,
      },
      {
        sss: 0,
        philhealth: 0,
        pagibig: 0,
        cashAdvance: 0,
        healthCard: 0,
        absences: 0,
        otherDeductions: 0,
      },
      {
        rate: 0,
        basic: 0,
      }
    );
    expect(result.payroll).toBe(0);
    expect(result.deductions).toBe(0);
    expect(result.total).toBe(0);
  });

  it('handles missing optional fields as NaN → test defensive coding', () => {
    const incompletePayroll = {
      ot: 2,
      salaryIncrease: 100,
    };
    const result = calculatePayroll(incompletePayroll, {}, config);
    expect(result.payroll).toBeNaN(); // Because some props are undefined -> parseFloat(undefined) is NaN
    expect(result.deductions).toBeNaN();
    expect(result.total).toBeNaN();
  });

  it('handles string inputs that represent numbers (real-world input edge)', () => {
    const payrollInfo = {
      ot: "3",
      salaryIncrease: "150",
      mealAllow: "100",
      bdayBonus: "100",
      incentive: "50",
      otherPayrollInfo: "0",
    };
    const deductions = {
      sss: "100",
      philhealth: "50",
      pagibig: "25",
      cashAdvance: "0",
      healthCard: "0",
      absences: "0",
      otherDeductions: "0",
    };
    const result = calculatePayroll(payrollInfo, deductions, config);
    const expectedPayroll = 10000 + (3 * 100) + 150 + 100 + 100 + 50 + 0;
    const expectedDeductions = 100 + 50 + 25;
    expect(result.payroll).toBe(expectedPayroll);
    expect(result.deductions).toBe(expectedDeductions);
    expect(result.total).toBe(expectedPayroll - expectedDeductions);
  });
});
