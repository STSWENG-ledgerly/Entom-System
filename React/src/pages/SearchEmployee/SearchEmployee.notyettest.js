/*
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchEmployee from './SearchEmployee';

// Mock modules and context
jest.mock('../../ConfigContext', () => ({
  BASE_URL: 'http://localhost:3001'
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { _id: '1', employee_id: '101', fname: 'John', lname: 'Doe', email: 'john@example.com', company: 'MyCompany' },
      { _id: '2', employee_id: '102', fname: 'Jane', lname: 'Smith', email: 'jane@example.com', company: 'MyCompany' }
    ])
  })
);

describe('SearchEmployee Component', () => {
  beforeEach(() => {
    sessionStorage.setItem('company', 'MyCompany');
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  const renderComponent = (searchType = 'GeneratePayroll') => {
    render(
      <MemoryRouter initialEntries={[`/search/${searchType}`]}>
        <Routes>
          <Route path="/search/:searchType" element={<SearchEmployee />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders search fields and fetches employee data', async () => {
    renderComponent();
    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(await screen.findByText('Jane')).toBeInTheDocument();
  });

  test('filters employees by ID', async () => {
    renderComponent();
    await screen.findByText('John');

    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '101' } });
    fireEvent.click(screen.getByText('Search by ID'));

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.queryByText('Jane')).not.toBeInTheDocument();
    });
  });

  test('filters employees by First Name', async () => {
    renderComponent();
    await screen.findByText('John');

    fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'Jane' } });
    fireEvent.click(screen.getByText('Search by First Name'));

    await waitFor(() => {
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });
  });

  test('filters employees by Last Name', async () => {
    renderComponent();
    await screen.findByText('John');

    fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'Smith' } });
    fireEvent.click(screen.getByText('Search by Last Name'));

    await waitFor(() => {
      expect(screen.getByText('Smith')).toBeInTheDocument();
      expect(screen.queryByText('Doe')).not.toBeInTheDocument();
    });
  });

  test('shows "No results" message when filter matches nothing', async () => {
    renderComponent();
    await screen.findByText('John');

    fireEvent.change(screen.getByDisplayValue(''), { target: { value: 'XYZ' } });
    fireEvent.click(screen.getByText('Search by ID'));


  });
});
*/