import { fireEvent, render, screen } from '@testing-library/react';
import DeductionsInfo from './DeductionsInfo';

describe('DeductionsInfo Component', () => {
  let deductions, setDeductions;

  beforeEach(() => {
    deductions = {
      sss: 100,
      philhealth: 200,
      pagibig: 300,
      cashAdvance: 400,
      healthCard: 500,
      absences: 600,
      otherDeductions: 700,
    };

    setDeductions = jest.fn();
  });

  it('renders all deduction input fields with correct default values', () => {
    render(<DeductionsInfo deductions={deductions} setDeductions={setDeductions} />);

    expect(screen.getByLabelText(/SSS/i).value).toBe('100');
    expect(screen.getByLabelText(/Philhealth/i).value).toBe('200');
    expect(screen.getByLabelText(/PAG-IBIG/i).value).toBe('300');
    expect(screen.getByLabelText(/Cash Advance/i).value).toBe('400');
    expect(screen.getByLabelText(/Health Card/i).value).toBe('500');
    expect(screen.getByLabelText(/Late\/Absent/i).value).toBe('600');
    expect(screen.getByLabelText(/Others/i).value).toBe('700');
  });

  it('calls setDeductions with correct value on change (rounded, non-negative)', () => {
    render(<DeductionsInfo deductions={deductions} setDeductions={setDeductions} />);

    const sssInput = screen.getByLabelText(/SSS/i);
    fireEvent.change(sssInput, { target: { value: '-50.987' } });

    expect(setDeductions).toHaveBeenCalledWith(expect.any(Function));
    const updater = setDeductions.mock.calls[0][0];
    const updated = updater(deductions);
    expect(updated.sss).toBe(0); // Because Math.max(0, -50.99) = 0
  });

  it('rounds values to 2 decimal places on change', () => {
    render(<DeductionsInfo deductions={deductions} setDeductions={setDeductions} />);
    const philhealthInput = screen.getByLabelText(/Philhealth/i);
    fireEvent.change(philhealthInput, { target: { value: '123.456' } });

    const updater = setDeductions.mock.calls[0][0];
    const updated = updater(deductions);
    expect(updated.philhealth).toBe(123.46); // Rounded
  });

  it('sets value to 0 on blur if input is invalid', () => {
    render(<DeductionsInfo deductions={deductions} setDeductions={setDeductions} />);
    const pagibigInput = screen.getByLabelText(/PAG-IBIG/i);
    fireEvent.blur(pagibigInput, { target: { value: 'abc' } });

    const updater = setDeductions.mock.calls[0][0];
    const updated = updater(deductions);
    expect(updated.pagibig).toBe(0);
  });

  it('does not change value on blur if input is valid', () => {
    render(<DeductionsInfo deductions={deductions} setDeductions={setDeductions} />);
    const absencesInput = screen.getByLabelText(/Late\/Absent/i);
    fireEvent.blur(absencesInput, { target: { value: '123.45' } });

    expect(setDeductions).not.toHaveBeenCalled(); // No update needed if valid
  });
});
