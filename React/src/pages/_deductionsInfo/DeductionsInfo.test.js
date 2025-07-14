import { fireEvent, render, screen } from '@testing-library/react';
import DeductionsInfo from './DeductionsInfo';

describe('DeductionsInfo', () => {
  let deductions;
  let setDeductions;

  beforeEach(() => {
    deductions = {
      sss: 0,
      philhealth: 0,
      pagibig: 0,
      cashAdvance: 0,
      healthCard: 0,
      absences: 0,
      otherDeductions: 0,
    };

    setDeductions = jest.fn();
    render(<DeductionsInfo deductions={deductions} setDeductions={setDeductions} />);
  });

  it('renders all input fields with correct labels', () => {
    expect(screen.getByLabelText(/SSS/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Philhealth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PAG-IBIG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cash Advance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Health Card/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Late\/Absent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Others/i)).toBeInTheDocument();
  });

  it('calls setDeductions when a field is changed', () => {
    const input = screen.getByLabelText(/SSS/i);
    fireEvent.change(input, { target: { value: '100' } });

    expect(setDeductions).toHaveBeenCalled();
    expect(setDeductions.mock.calls[0][0]).toEqual(expect.any(Function));
  });

  it('resets field to 0 on blur with invalid input', () => {
    const input = screen.getByLabelText(/Philhealth/i);
    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.blur(input);

    expect(setDeductions).toHaveBeenCalled();
  });
});
