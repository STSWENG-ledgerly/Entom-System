import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import Login from './Login';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('Login Component', () => {
  const mockSetUsername = jest.fn();

  const renderLogin = () => {
    render(
      <ConfigContext.Provider value={{ setUsername: mockSetUsername }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </ConfigContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test('renders input fields and buttons', () => {
    renderLogin();

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('updates input fields', () => {
    renderLogin();

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('password123');
  });

  test('navigates to MainMenu on successful login', async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ username: 'testuser', company: 'TestCorp' }),
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/MainMenu'));
    expect(mockSetUsername).toHaveBeenCalledWith('testuser');
    expect(sessionStorage.getItem('username')).toBe('testuser');
    expect(sessionStorage.getItem('userValid')).toBe('true');
  });

  test('shows error message on invalid credentials (401)', async () => {
    fetch.mockResolvedValueOnce({ status: 401 });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrong' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'badpass' } });
    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() =>
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument()
    );
  });

  test('shows generic error for other server errors', async () => {
    fetch.mockResolvedValueOnce({ status: 500 });

    renderLogin();

    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() =>
      expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument()
    );
  });

  test('shows error message on fetch failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch error'));

    renderLogin();

    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() =>
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
    );
  });
});
