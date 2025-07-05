import { fireEvent, render, screen } from '@testing-library/react';
import { ConfigContext } from '../../ConfigContext';
import SettingsMenu from './SettingsMenu';

describe('SettingsMenu', () => {
  const mockSetTrigger = jest.fn();
  const mockSetPassword = jest.fn();

  const renderMenu = (trigger = true, password = 'correctpass') => {
    render(
      <ConfigContext.Provider value={{ password, setPassword: mockSetPassword }}>
        <SettingsMenu trigger={trigger} setTrigger={mockSetTrigger} />
      </ConfigContext.Provider>
    );
  };

  it('does not render when trigger is false', () => {
    renderMenu(false);
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('shows error when old password is wrong', () => {
    renderMenu();

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpass123' },
    });
    fireEvent.click(screen.getByText(/Confirm Changes/i));

    expect(screen.getByText(/Password is incorrect/i)).toBeInTheDocument();
    expect(mockSetPassword).not.toHaveBeenCalled();
  });

  it('shows error when new password is blank', () => {
    renderMenu();

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'correctpass' },
    });
    fireEvent.click(screen.getByText(/Confirm Changes/i));

    expect(screen.getByText(/New password cannot be blank/i)).toBeInTheDocument();
    expect(mockSetPassword).not.toHaveBeenCalled();
  });

  it('calls setPassword on valid change', () => {
    renderMenu();

    fireEvent.change(screen.getByLabelText(/Old Password/i), {
      target: { value: 'correctpass' },
    });
    fireEvent.change(screen.getByLabelText(/New Password/i), {
      target: { value: 'newpass123' },
    });
    fireEvent.click(screen.getByText(/Confirm Changes/i));

    expect(mockSetPassword).toHaveBeenCalledWith('newpass123');
    expect(screen.getByText(/Password change successfully!/i)).toBeInTheDocument();
  });

  it('resets and closes when exit is clicked', () => {
    renderMenu();

    fireEvent.click(screen.getByRole('button', { name: '' })); // close button has no visible label
    expect(mockSetTrigger).toHaveBeenCalledWith(false);
  });
});
