// EditPayroll.test.js
import { render, screen } from '@testing-library/react';
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
          formatted_date: '2024-01-01',
          overtimeDays: 5,
          salaryIncrease: 200,
          mealAllowance: 100,
          birthdayBonus: 300,
          incentive: 150,
          otherAdditions: 50,
          sss: 100,
          philHealth: 200,
          pagIbig: 100,
          cashAdvance: 50,
          healthCard: 0,
          lateAbsent: 0,
          otherDeductions: 0,
          payroll: 11000,
          deductions: 450,
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

test('renders EditPayroll and displays heading with employee name', async () => {
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

  const heading = await screen.findByRole('heading', {
    name: /edit payroll for john doe/i,
  });

  expect(heading).toBeInTheDocument();
});
