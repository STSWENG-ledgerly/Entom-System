import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Sidebar'; // Assuming the filename is Sidebar.js

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockClear();
  sessionStorage.clear();
  sessionStorage.setItem('userValid', 'true');
});

test('renders all navigation buttons and triggers navigation', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // Check each button is rendered and simulate click
  fireEvent.click(screen.getByText('MAIN MENU'));
  expect(mockNavigate).toHaveBeenCalledWith('/MainMenu');

  fireEvent.click(screen.getByText('SET DEFAULT RATES'));
  expect(mockNavigate).toHaveBeenCalledWith('/SetDefaults');

  fireEvent.click(screen.getByText('PAYROLL HISTORY'));
  expect(mockNavigate).toHaveBeenCalledWith('/SearchEmployee/ViewPayrollHistory');

  fireEvent.click(screen.getByText('CALCULATE PAYROLL'));
  expect(mockNavigate).toHaveBeenCalledWith('/SearchEmployee/CalculatePayroll');

  fireEvent.click(screen.getByText('ADD EMPLOYEE'));
  expect(mockNavigate).toHaveBeenCalledWith('/AddEmployee');

  fireEvent.click(screen.getByText('EDIT EMPLOYEE'));
  expect(mockNavigate).toHaveBeenCalledWith('/EditEmployee');

  fireEvent.click(screen.getByText('BACK'));
  expect(mockNavigate).toHaveBeenCalledWith(-1);

  fireEvent.click(screen.getByText('EXIT'));
  expect(mockNavigate).toHaveBeenCalledWith('/');
  expect(sessionStorage.getItem('userValid')).toBeNull(); // session cleared
});
