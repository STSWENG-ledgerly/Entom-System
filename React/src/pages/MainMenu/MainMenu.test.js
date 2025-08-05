import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext'; // adjust the path if needed
import MainMenu from './MainMenu';

const contextValue = {
  password: '',
  setPassword: jest.fn(),
  username: 'testUser',
};

describe('MainMenu', () => {
  test('renders all menu links', () => {
    render(
      <ConfigContext.Provider value={contextValue}>
        <MemoryRouter>
          <MainMenu />
        </MemoryRouter>
      </ConfigContext.Provider>
    );

    expect(screen.getByText('Set Default Rates')).toBeInTheDocument();
    expect(screen.getByText('Generate Employee Payroll')).toBeInTheDocument();
    expect(screen.getByText('View Payroll History')).toBeInTheDocument();
    expect(screen.getByText('Add Employee')).toBeInTheDocument();
    expect(screen.getByText('Edit Employee')).toBeInTheDocument();
  });
});
