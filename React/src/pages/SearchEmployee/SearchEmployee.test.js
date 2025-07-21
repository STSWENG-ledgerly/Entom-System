import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import SearchEmployee from './SearchEmployee';

// Mock fetch globally
global.fetch = jest.fn();

const mockEmployees = [
  {
    _id: '1',
    employee_id: '1001',
    fname: 'John',
    lname: 'Doe',
    email: 'john@example.com',
    company: 'ABC Corp',
  },
  {
    _id: '2',
    employee_id: '1002',
    fname: 'Jane',
    lname: 'Smith',
    email: 'jane@example.com',
    company: 'ABC Corp',
  },
];

// Mock Sidebar and Header to prevent rendering unrelated components
jest.mock('../_sidebar/Sidebar', () => () => <div data-testid="mock-sidebar" />);
jest.mock('../_header/Header', () => () => <div data-testid="mock-header" />);

// Make sure react-router hooks are mocked correctly for useParams, etc.
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ searchType: 'ViewPayrollHistory' }),
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: '/' }),
  };
});

// Reusable wrapper
const renderWithContext = (ui) => {
  return render(
    <ConfigContext.Provider value={{ password: '', setPassword: jest.fn() }}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ConfigContext.Provider>
  );
};

beforeEach(() => {
  sessionStorage.setItem('company', 'ABC Corp');
  fetch.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockEmployees),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SearchEmployee Component', () => {
  test('renders with fetched employees and searches by ID', async () => {
    renderWithContext(<SearchEmployee />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    const idInput = screen.getAllByRole('textbox')[0];
    fireEvent.change(idInput, { target: { value: '1001' } });
    fireEvent.click(screen.getByText(/Search by ID/i));
  });

  test('searches by first name', async () => {
    renderWithContext(<SearchEmployee />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    const fnameInput = screen.getAllByRole('textbox')[1];
    fireEvent.change(fnameInput, { target: { value: 'Jane' } });
    fireEvent.click(screen.getByText(/Search by First Name/i));
  });

  test('searches by last name', async () => {
    renderWithContext(<SearchEmployee />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    const lnameInput = screen.getAllByRole('textbox')[2];
    fireEvent.change(lnameInput, { target: { value: 'Doe' } });
    fireEvent.click(screen.getByText(/Search by Last Name/i));
  });
});
