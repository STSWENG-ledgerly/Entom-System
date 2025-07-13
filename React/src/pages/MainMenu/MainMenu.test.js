// MainMenu.test.js
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainMenu from './MainMenu';

// Mock dependencies
jest.mock('../_sidebar/Sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('../_header/Header', () => () => <div data-testid="header" />);

describe('MainMenu Component', () => {
  beforeEach(() => {
    sessionStorage.setItem('userValid', 'true');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  test('renders MainMenu and displays navigation links', () => {
    render(
      <MemoryRouter>
        <MainMenu />
      </MemoryRouter>
    );

    expect(screen.getByText(/MAIN MENU/i)).toBeInTheDocument();
    expect(screen.getByText(/Set Default Rates/i)).toBeInTheDocument();
    expect(screen.getByText(/View Payroll History/i)).toBeInTheDocument();
    expect(screen.getByText(/Generate Employee Payroll/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });

  test('Exit link removes userValid from sessionStorage', () => {
    render(
      <MemoryRouter>
        <MainMenu />
      </MemoryRouter>
    );

    const exitLink = screen.getByText(/Exit/i);
    fireEvent.click(exitLink);
    expect(sessionStorage.getItem('userValid')).toBeNull();
  });
});
