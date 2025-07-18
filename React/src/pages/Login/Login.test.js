import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import Login from './Login';

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

// Helper to render with context
const renderLogin = () =>
  render(
    <ConfigContext.Provider value={{ username: 'admin', passwordHash: 'hashedPassword' }}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </ConfigContext.Provider>
  );

beforeEach(() => {
  jest.clearAllMocks();
  sessionStorage.clear();
});

test('logs in successfully with valid credentials', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          username: 'admin',
          password: 'password123',
          company: 'MyCompany',
        }),
    })
  );

  renderLogin();

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: 'admin' },
  });
  fireEvent.change(screen.getByPlaceholderText(/admin password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/MainMenu');
    expect(sessionStorage.getItem('userValid')).toBe('true');
    expect(sessionStorage.getItem('company')).toBe('MyCompany');
    expect(sessionStorage.getItem('username')).toBe('admin');
  });
});

test('shows error when password is incorrect', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          username: 'admin',
          password: 'correctPassword',
          company: 'MyCompany',
        }),
    })
  );

  renderLogin();

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: 'admin' },
  });
  fireEvent.change(screen.getByPlaceholderText(/admin password/i), {
    target: { value: 'wrongPassword' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/password is incorrect/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

test('shows error when username is not found', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
    })
  );

  renderLogin();

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: 'unknown' },
  });
  fireEvent.change(screen.getByPlaceholderText(/admin password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(screen.getByText(/username not found/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});