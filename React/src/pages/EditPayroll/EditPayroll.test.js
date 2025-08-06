import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import EditPayroll from './EditPayroll';

// Mock input data returned from fetch
const mockPayrollData = {
  payDate: '2024-07-01',
  overtimeDetails: [],
  salaryIncrease: 200,
  allowances: {
    mealAllowance: 100,
    birthdayBonus: 300,
    incentives: 150,
    otherAdditions: 50,
  },
  deductions: {
    sss: 100,
    philHealth: 200,
    pagIbig: 100,
    cashAdvance: 50,
    healthCard: 0,
    lateAbsent: 0,
    otherDeductions: 0,
  },
  grossSalary: 11000,
  totalDeductions: 450,
  total: 10550,
  rate: 100,
  basic: 10000,
};

const mockConfig = {
  rate: 100,
  basic: 10000,
};

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/getPayment/')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockPayrollData),
      });
    }

    if (url.includes('/editPayment/')) {
      return Promise.resolve({
        json: () => Promise.resolve({ status: 'ok' }),
      });
    }

    return Promise.reject('Unknown API call');
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders EditPayroll, fetches data, and saves edited payroll', async () => {
  render(
    <ConfigContext.Provider value={{ config: mockConfig }}>
      <MemoryRouter initialEntries={['/edit/1/123/John/Doe']}>
        <Routes>
          <Route path="/edit/:id/:payment_id/:fname/:lname" element={<EditPayroll />} />
        </Routes>
      </MemoryRouter>
    </ConfigContext.Provider>
  );

  // Wait for title to show up
  expect(await screen.findByText(/Edit Payroll for John Doe/i)).toBeInTheDocument();

  // Wait for data to load into inputs
  await waitFor(() => {
    expect(screen.getByDisplayValue('100')).toBeInTheDocument(); // RATE
    expect(screen.getByDisplayValue('10000')).toBeInTheDocument(); // BASIC
  });

  // Click SAVE and expect fetch call
  const saveButton = screen.getByText('SAVE');
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/editPayment/123'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });
});
