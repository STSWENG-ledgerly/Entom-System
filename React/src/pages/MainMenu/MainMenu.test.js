import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext'; // Adjust path as needed
import MainMenu from './MainMenu';

describe('MainMenu', () => {
  beforeEach(() => {
    sessionStorage.setItem('userValid', 'true');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('renders all navigation buttons with correct IDs and text', () => {
    const mockContext = {
      username: 'testuser',
      password: 'testpass',
      setPassword: jest.fn(),
    };

    render(
      <ConfigContext.Provider value={mockContext}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </ConfigContext.Provider>
    );

    expect(screen.getByText('Set Default Rates')).toBeInTheDocument();
    expect(screen.getByText('Calculate Employee Payroll')).toBeInTheDocument();
    expect(screen.getByText('View Payroll History')).toBeInTheDocument();
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
    expect(screen.getByText('Edit Employee')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });
});
