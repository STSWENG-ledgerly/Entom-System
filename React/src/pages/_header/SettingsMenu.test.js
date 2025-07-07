import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ConfigContext } from '../../ConfigContext';
import SettingsMenu from './SettingsMenu';

const renderWithConfig = (value) => {
  return render(
    <ConfigContext.Provider value={value}>
      <SettingsMenu trigger={true} setTrigger={() => {}} />
    </ConfigContext.Provider>
  );
};

describe('SettingsMenu', () => {
  test('shows error when old password is wrong', () => {
    const contextValue = {
      password: 'correctpass',
      setPassword: jest.fn(),
    };

    renderWithConfig(contextValue);

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpassword123' },
    });

    fireEvent.click(screen.getByText(/Confirm Changes/i));

    expect(screen.getByText(/Password is incorrect/i)).toBeInTheDocument();
  });

  test('shows error when new password is blank', () => {
    const contextValue = {
      password: 'correctpass',
      setPassword: jest.fn(),
    };

    renderWithConfig(contextValue);

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'correctpass' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText(/Confirm Changes/i));

    expect(screen.getByText(/New password cannot be blank/i)).toBeInTheDocument();
  });

  test('calls setPassword on valid change', () => {
    const mockSetPassword = jest.fn();
    const contextValue = {
      password: 'correctpass',
      setPassword: mockSetPassword,
    };

    renderWithConfig(contextValue);

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'correctpass' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newsecure123' },
    });

    fireEvent.click(screen.getByText(/Confirm Changes/i));

    expect(mockSetPassword).toHaveBeenCalledWith('newsecure123');
    expect(screen.getByText(/Password change successfully/i)).toBeInTheDocument();
  });
});
