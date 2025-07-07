// Sidebar.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  test('renders without crashing', () => {
    render(<Sidebar />, { wrapper: MemoryRouter });

    expect(screen.getByText(/MAIN MENU/i)).toBeInTheDocument();
    expect(screen.getByText(/SET DEFAULT RATES/i)).toBeInTheDocument();
    expect(screen.getByText(/PAYROLL HISTORY/i)).toBeInTheDocument();
    expect(screen.getByText(/CALCULATE PAYROLL/i)).toBeInTheDocument();
    expect(screen.getByText(/BACK/i)).toBeInTheDocument();
    expect(screen.getByText(/LOGOUT/i)).toBeInTheDocument();
  });
});
