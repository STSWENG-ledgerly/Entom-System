import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import GeneratePayroll from './GeneratePayroll';

// Mock external dependencies
jest.mock('../_sidebar/Sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('../_header/Header', () => () => <div data-testid="header" />);
jest.mock('../_payrollInfo/PayrollInfo', () => ({ payrollInfo, setPayrollInfo }) => (
  <div data-testid="payroll-info">
    <input
      type="number"
      placeholder="OT"
      value={payrollInfo.ot}
      onChange={(e) => setPayrollInfo({ ...payrollInfo, ot: parseInt(e.target.value) })}
    />
  </div>
));
jest.mock('../_deductionsInfo/DeductionsInfo', () => ({ deductions, setDeductions }) => (
  <div data-testid="deductions-info">
    <input
      type="number"
      placeholder="SSS"
      value={deductions.sss}
      onChange={(e) => setDeductions({ ...deductions, sss: parseInt(e.target.value) })}
    />
  </div>
));
jest.mock('../_resultsInfo/ResultsInfo', () => ({ results }) => (
  <div data-testid="results-info">{`Net Pay: ${results.total}`}</div>
));

// Mock calculatePayroll function
jest.mock('../_calculatePayroll/CalculatePayroll', () => ({
  calculatePayroll: (payrollInfo, deductions, config) => ({
    payroll: 10000,
    deductions: 1000,
    total: 9000
  })
}));

// Mock jsPDF
jest.mock('jspdf', () => {
  return function () {
    return {
      setFontSize: jest.fn(),
      setFont: jest.fn(),
      text: jest.fn(),
      line: jest.fn(),
      rect: jest.fn(),
      output: jest.fn(() => new Blob(['%PDF-1.4...'], { type: 'application/pdf' })),
    };
  };
});

const mockConfig = { rate: 100, basic: 10000 };
const mockCreateUserPayment = jest.fn();

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ email: 'test@example.com' }])
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderWithContext = () => {
  render(
    <ConfigContext.Provider value={{ config: mockConfig, createUserPayment: mockCreateUserPayment }}>
      <MemoryRouter initialEntries={['/generate/1/John/Doe']}>
        <Routes>
          <Route path="/generate/:id/:fname/:lname" element={<GeneratePayroll />} />
        </Routes>
      </MemoryRouter>
    </ConfigContext.Provider>
  );
};

describe('GeneratePayroll Component', () => {
  test('renders correctly with required components', async () => {
    renderWithContext();

    expect(await screen.findByText(/Generate Payroll for John Doe/i)).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('payroll-info')).toBeInTheDocument();
    expect(screen.getByTestId('deductions-info')).toBeInTheDocument();
  });

  test('displays results after clicking CALCULATE', async () => {
    renderWithContext();

    // Simulate form input if needed (mocked above already fills some defaults)
    const calculateButton = screen.getByText(/CALCULATE/i);
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByTestId('results-info')).toBeInTheDocument();
      expect(screen.getByText(/Net Pay: 9000/)).toBeInTheDocument();
    });
  });
});
