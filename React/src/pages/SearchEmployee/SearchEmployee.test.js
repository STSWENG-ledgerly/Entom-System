import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SearchEmployee } from './SearchEmployee';

// Mock dependencies
jest.mock('../../ConfigContext', () => ({
  BASE_URL: 'http://mockapi.com',
}));
jest.mock('../../global.module.css', () => ({}));
jest.mock('./SearchEmployee.module.css', () => ({}));
jest.mock('../_header/Header', () => () => <div>Mock Header</div>);
jest.mock('../_sidebar/Sidebar', () => () => <div>Mock Sidebar</div>);

// Mock sessionStorage
beforeEach(() => {
  sessionStorage.setItem('company', 'OpenAI');
});

describe('SearchEmployee Component', () => {
  const mockEmployees = [
    {
      _id: '1',
      employee_id: '1001',
      fname: 'John',
      lname: 'Doe',
      email: 'john.doe@example.com',
      company: 'OpenAI',
    },
    {
      _id: '2',
      employee_id: '1002',
      fname: 'Jane',
      lname: 'Smith',
      email: 'jane.smith@example.com',
      company: 'OpenAI',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockEmployees),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function setup(path = '/searchEmployee/ViewPayrollHistory') {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/searchEmployee/:searchType" element={<SearchEmployee />} />
        </Routes>
      </MemoryRouter>
    );
  }

  test('renders correct title', async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText(/View Payroll History of an Employee/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays employees', async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });

  test('filters by ID', async () => {
    setup();
    await waitFor(() => screen.getByText('John'));

    const inputs = screen.getAllByRole('textbox');
    const idInput = inputs[0]; // First input is for ID

    fireEvent.change(idInput, { target: { value: '1001' } });
    fireEvent.click(screen.getByText(/Search by ID/i));

    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).toBeNull();
  });

  test('filters by first name', async () => {
    setup();
    await waitFor(() => screen.getByText('Jane'));

    const inputs = screen.getAllByRole('textbox');
    const fnameInput = inputs[1];

    fireEvent.change(fnameInput, { target: { value: 'Jane' } });
    fireEvent.click(screen.getByText(/Search by First Name/i));

    expect(await screen.findByText('Jane')).toBeInTheDocument();
    expect(screen.queryByText('John')).toBeNull();
  });

  test('filters by last name', async () => {
    setup();
    await waitFor(() => screen.getByText('Doe'));

    const inputs = screen.getAllByRole('textbox');
    const lnameInput = inputs[2];

    fireEvent.change(lnameInput, { target: { value: 'Smith' } });
    fireEvent.click(screen.getByText(/Search by Last Name/i));

    expect(await screen.findByText('Smith')).toBeInTheDocument();
    expect(screen.queryByText('Doe')).toBeNull();
  });

  test('shows "no results found" when search yields nothing', async () => {
    setup();
    await waitFor(() => screen.getByText('John'));

    const inputs = screen.getAllByRole('textbox');
    const idInput = inputs[0];

    fireEvent.change(idInput, { target: { value: '9999' } });
    fireEvent.click(screen.getByText(/Search by ID/i));

    expect(await screen.findByText(/No results found/i)).toBeInTheDocument();
  });
});
