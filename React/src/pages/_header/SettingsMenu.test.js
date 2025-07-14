// SettingsMenu.test.js
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ConfigContext } from '../../ConfigContext';
import SettingsMenu from './SettingsMenu';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('SettingsMenu Component', () => {
  const setPassword = jest.fn();
  const props = {
    trigger: true,
    setTrigger: jest.fn(),
  };

  const renderWithContext = (password = 'admin') =>
    render(
      <ConfigContext.Provider value={{ password, setPassword }}>
        <SettingsMenu {...props} />
      </ConfigContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );
  });

  test('renders SettingsMenu when trigger is true', () => {
    renderWithContext();
    expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
  });

  test('displays error when old password is incorrect', () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpass123' },
    });

    fireEvent.click(screen.getByText(/Confirm Changes/i));

    expect(screen.getByText(/Password is incorrect./i)).toBeInTheDocument();
  });

  
  test('displays success when password is correct and changed', async () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpass123' },
    });

    fireEvent.click(screen.getByText(/Confirm Changes/i));

    await waitFor(() =>
      expect(screen.queryByText(/Password change successfully!/i)).toBeInTheDocument()
    );

    expect(setPassword).toHaveBeenCalledWith('newpass123');
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/savePassword'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'newpass123' }),
      })
    );
  });

  test('shows validation when new password is empty', () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'admin' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText(/Confirm Changes/i));
    expect(screen.getByText(/New password cannot be blank/i)).toBeInTheDocument();
  });

  test('closes settings menu on exit', () => {
    renderWithContext();

    const closeBtn = screen.getByRole('button', { name: '' }); // close button has no label
    fireEvent.click(closeBtn);
    expect(props.setTrigger).toHaveBeenCalledWith(false);
  });
});
