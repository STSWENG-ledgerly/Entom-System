import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import Login from './Login';

// Mock image to prevent import error
jest.mock('../Login/office.jpg', () => 'office.jpg');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  const renderWithContext = (contextValue) => {
    return render(
      <ConfigContext.Provider value={contextValue}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </ConfigContext.Provider>
    );
  };

  const context = {
    username: 'admin',
    passwordHash: '12345',
  };

  beforeEach(() => {
    sessionStorage.clear();
    mockNavigate.mockClear();
  });

  test('renders login form correctly', () => {
    renderWithContext(context);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Admin Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('successful login with correct credentials', () => {
    renderWithContext(context);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Admin Password/i), {
      target: { value: '12345' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(sessionStorage.getItem('userValid')).toBe('true');
    expect(mockNavigate).toHaveBeenCalledWith('/MainMenu');
  });

  test('shows error when username is incorrect', () => {
    renderWithContext(context);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Admin Password/i), {
      target: { value: '12345' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/Username not found/i)).toBeInTheDocument();
    expect(sessionStorage.getItem('userValid')).toBeNull();
  });

  test('shows error when password is incorrect', () => {
    renderWithContext(context);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Admin Password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/Password is incorrect/i)).toBeInTheDocument();
    expect(sessionStorage.getItem('userValid')).toBeNull();
  });
});
