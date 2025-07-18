import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login/Login'; // adjust if needed

// Mock BASE_URL
jest.mock('../../ConfigContext', () => ({
  BASE_URL: 'http://localhost:3000',
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

beforeEach(() => {
  sessionStorage.clear();
  jest.resetAllMocks();
  global.fetch = jest.fn();
});

describe('Login.js', () => {
  test('UT-E01: Login with correct credentials', async () => {
    const mockResponse = { username: 'admin', company: 'TestCorp' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(sessionStorage.getItem('userValid')).toBe('true');
      expect(sessionStorage.getItem('username')).toBe('admin');
      expect(sessionStorage.getItem('company')).toBe('TestCorp');
    });
  });

  test('UT-E02: Login with incorrect password (401)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
  });

  test('UT-E03: Login with server error (e.g., 500)', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/login failed. please try again./i)).toBeInTheDocument();
    });
  });
});
