import { fireEvent, render, screen } from '@testing-library/react';
import PayrollInfo from './PayrollInfo';

describe('PayrollInfo Component', () => {
  let payrollInfo;
  let setPayrollInfo;

  beforeEach(() => {
    payrollInfo = {
      date: '2025-07-01',
      ot: 0,
      salaryIncrease: 0,
      mealAllow: 0,
      bdayBonus: 0,
      incentive: 0,
      otherPayrollInfo: 0,
    };

    setPayrollInfo = jest.fn();
  });

  test('renders all fields', () => {
    render(<PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />);
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Overtime/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Salary Increase/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Meal Allowance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday Bonus/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Incentive/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Others/i)).toBeInTheDocument();
  });

  test('updates numeric fields correctly', () => {
    const setPayrollInfo = jest.fn();
    const payrollInfo = {
        date: '2025-07-01',
        ot: 0,
        salaryIncrease: 0,
        mealAllow: 0,
        bdayBonus: 0,
        incentive: 0,
        otherPayrollInfo: 0,
    };

    render(<PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />);

    const otInput = screen.getByLabelText(/Overtime/i);
    fireEvent.change(otInput, { target: { value: '2.5' } });

    // Grab the updater function from the mock
    const updater = setPayrollInfo.mock.calls[0][0];
    const updated = updater(payrollInfo);

    expect(updated).toEqual(expect.objectContaining({ ot: 2.5 }));
    });


  test('sets to 0 onBlur if value is not a number', () => {
    const setPayrollInfo = jest.fn();
    const payrollInfo = {
        ot: 0,
        salaryIncrease: 100,
        mealAllow: 0,
        bdayBonus: 0,
        incentive: 0,
        otherPayrollInfo: 0,
        date: '2025-07-01',
    };

    render(<PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />);

    const input = screen.getByLabelText(/Salary Increase/i);
    fireEvent.change(input, { target: { value: 'invalid' } });
    fireEvent.blur(input);

    const updateFn = setPayrollInfo.mock.calls[0][0];
    const updated = updateFn(payrollInfo);

    expect(updated.salaryIncrease).toBe(0);
  });

  test('prevents negative numbers (auto-sets to 0)', () => {
    const setPayrollInfo = jest.fn();
    const payrollInfo = {
        ot: 0,
        salaryIncrease: 0,
        mealAllow: 200,
        bdayBonus: 0,
        incentive: 0,
        otherPayrollInfo: 0,
        date: '2025-07-01',
    };

    render(<PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />);

    const input = screen.getByLabelText(/Meal Allowance/i);
    fireEvent.change(input, { target: { value: '-100' } });

    const updateFn = setPayrollInfo.mock.calls[0][0];
    const updated = updateFn(payrollInfo);

    expect(updated.mealAllow).toBe(0);
  });

  test('rounds to 2 decimal places', () => {
    const setPayrollInfo = jest.fn();
    const payrollInfo = {
        ot: 0,
        salaryIncrease: 0,
        mealAllow: 0,
        bdayBonus: 0,
        incentive: 0,
        otherPayrollInfo: 0,
        date: '2025-07-01',
    };

    render(<PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />);

    const input = screen.getByLabelText(/Incentive/i);
    fireEvent.change(input, { target: { value: '123.456' } });

    const updateFn = setPayrollInfo.mock.calls[0][0];
    const updated = updateFn(payrollInfo);

    expect(updated.incentive).toBeCloseTo(123.46, 2);
  });


  test('empty string onBlur sets value to 0', () => {
    const setPayrollInfo = jest.fn();
    const payrollInfo = {
        ot: 0,
        salaryIncrease: 0,
        mealAllow: 0,
        bdayBonus: 0,
        incentive: 0,
        otherPayrollInfo: 150,
        date: '2025-07-01',
    };

    render(<PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />);

    const input = screen.getByLabelText(/Others/i);
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);

    const updateFn = setPayrollInfo.mock.calls[0][0];
    const updated = updateFn(payrollInfo);

    expect(updated.otherPayrollInfo).toBe(0);
  });

});
