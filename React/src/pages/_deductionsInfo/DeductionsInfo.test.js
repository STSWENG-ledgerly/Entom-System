import { fireEvent, render, screen } from '@testing-library/react';
import DeductionsInfo from './DeductionsInfo';

describe('DeductionsInfo', () => {
  const initialDeductions = {
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    cashAdvance: 0,
    healthCard: 0,
    absences: 0,
    otherDeductions: 0,
  };
  let deductions;
  let setDeductions;

  // Fresh state 
  beforeEach(() => {
    deductions = { ...initialDeductions };
    setDeductions = jest.fn((updateFn) => {
      deductions = updateFn(deductions); 
    });

    render(<DeductionsInfo deductions={deductions} setDeductions={setDeductions} />);
  });

  // Added ID and htmlFor to get this test passed
  it('renders all input fields with correct labels', () => {
    expect(screen.getByLabelText(/SSS/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Philhealth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PAG-IBIG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cash Advance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Health Card/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Late\/Absent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Others/i)).toBeInTheDocument();
  });

  it('calls setDeductions when value is changed', () => {
    const sssInput = screen.getByLabelText(/SSS/i);
    fireEvent.change(sssInput, { target: { value: '123.456' } });

    expect(setDeductions).toHaveBeenCalledTimes(1);
    setDeductions((prevState) => {
      expect(prevState.sss).toBe(123.46); 
      return prevState;
    });
  });

  it('resets field to 0 on blur with invalid input', () => {
    const sssInput = screen.getByLabelText(/SSS/i);

    fireEvent.change(sssInput, { target: { value: 'abc' } }); // invalid
    fireEvent.blur(sssInput);

    expect(setDeductions).toHaveBeenCalledTimes(1); 
  });
});
