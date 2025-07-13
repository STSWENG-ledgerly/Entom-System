// SearchEmployee.test.js
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchEmployee from './SearchEmployee';

// Mock Sidebar and Header
jest.mock('../_sidebar/Sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('../_header/Header', () => () => <div data-testid="header" />);

// Mock sessionStorage
beforeEach(() => {
  sessionStorage.setItem('company', 'ACME');
});
afterEach(() => {
  sessionStorage.clear();
});

const mockEmployees = [
  {
    _id: '1',
    employee_id: 123,
    fname: 'John',
    lname: 'Doe',
    email: 'john@example.com',
    company: 'ACME',
  },
  {
    _id: '2',
    employee_id: 456,
    fname: 'Jane',
    lname: 'Smith',
    email: 'jane@example.com',
    company: 'ACME',
  }
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockEmployees),
  })
);

describe('SearchEmployee Component', () => {
  test('renders and displays employees based on search by ID', async () => {
    render(
      <MemoryRouter initialEntries={['/SearchEmployee/ViewPayrollHistory']}>
        <Routes>
          <Route path="/SearchEmployee/:searchType" element={<SearchEmployee />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for fetch to resolve
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    // Search by ID
    const idInput = screen.getByRole('textbox', { name: '' });
    fireEvent.change(idInput, { target: { value: '123' } });
    fireEvent.click(screen.getByText('Search by ID'));

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  test('search by first name works', async () => {
    render(
      <MemoryRouter initialEntries={['/SearchEmployee/GeneratePayroll']}>
        <Routes>
          <Route path="/SearchEmployee/:searchType" element={<SearchEmployee />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Jane'));

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[1], { target: { value: 'Jane' } });
    fireEvent.click(screen.getByText('Search by First Name'));

    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

  test('search by last name works', async () => {
    render(
      <MemoryRouter initialEntries={['/SearchEmployee/GeneratePayroll']}>
        <Routes>
          <Route path="/SearchEmployee/:searchType" element={<SearchEmployee />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Doe'));

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[2], { target: { value: 'Doe' } });
    fireEvent.click(screen.getByText('Search by Last Name'));

    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.queryByText('Smith')).not.toBeInTheDocument();
  });
});
