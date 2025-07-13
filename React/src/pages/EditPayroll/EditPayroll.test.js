import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import EditPayroll from './EditPayroll';

const mockConfig = {
  rate: 100,
  basic: 10000,
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          payDate: '2024-01-01',
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
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders EditPayroll with employee name and loads data', async () => {
  render(
    <ConfigContext.Provider value={{ config: mockConfig }}>
      <MemoryRouter initialEntries={['/edit/1/101/John/Doe']}>
        <Routes>
          <Route
            path="/edit/:id/:payment_id/:fname/:lname"
            element={<EditPayroll />}
          />
        </Routes>
      </MemoryRouter>
    </ConfigContext.Provider>
  );

  // Wait for heading to appear with employee's name
  const heading = await screen.findByRole('heading', {
    name: /edit payroll for john doe/i,
  });
  expect(heading).toBeInTheDocument();

  // Check if a known input appears (e.g., basic salary)
  await waitFor(() => {
    expect(screen.getByLabelText(/basic/i)).toBeInTheDocument();
  });
});
