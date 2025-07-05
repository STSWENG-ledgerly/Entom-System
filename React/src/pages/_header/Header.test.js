import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

// Mock the images // change based on if the images are changed
jest.mock('./logo.svg', () => 'logo.svg');
jest.mock('./setting.svg', () => 'setting.svg');

jest.mock('./SettingsMenu', () => ({ trigger }) => (
  <div>{trigger ? 'Settings Menu Open' : 'Settings Menu Closed'}</div>
));

describe('Header', () => {
  test('renders logo and settings icon', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: '' });
    const settingsIcon = screen.getAllByRole('img')[1];

    expect(logo).toBeInTheDocument();
    expect(settingsIcon).toBeInTheDocument();
  });

  test('opens settings menu when settings icon is clicked', () => {
    render(<Header />);
    expect(screen.getByText('Settings Menu Closed')).toBeInTheDocument();

    const settingsIcon = screen.getAllByRole('img')[1];
    fireEvent.click(settingsIcon);

    expect(screen.getByText('Settings Menu Open')).toBeInTheDocument();
  });
});
