import { render, screen } from '@testing-library/react';
import ResultsInfo from './ResultsInfo';

describe('ResultsInfo Component', () => {
  const mockResults = {
    payroll: 12345.678,
    deductions: 2345.678,
    total: 10000,
  };

  test('renders formatted payroll, deductions, and total', () => {
    render(<ResultsInfo results={mockResults} />);

    const payrollInput = screen.getByLabelText(/PAYROLL/i);
    const deductionsInput = screen.getByLabelText(/DEDUCTIONS/i);
    const totalInput = screen.getByLabelText(/TOTAL/i);

    expect(payrollInput).toHaveValue('12345.68');      // Rounded to 2 decimal places
    expect(deductionsInput).toHaveValue('2345.68');    // Rounded to 2 decimal places
    expect(totalInput).toHaveValue('10000.00');        // Rounded to 2 decimal places
  });

  test('inputs are read-only', () => {
    render(<ResultsInfo results={mockResults} />);

    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toHaveAttribute('readonly');
    });
  });
});
