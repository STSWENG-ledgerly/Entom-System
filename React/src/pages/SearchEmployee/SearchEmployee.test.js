import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import SearchEmployee from './SearchEmployee';

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { employee_id: 1, fname: 'John', lname: 'Doe', email: 'john@example.com' },
        { employee_id: 2, fname: 'Jane', lname: 'Smith', email: 'jane@example.com' }
      ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderComponent = (searchType = 'ViewPayrollHistory') => {
  render(
    <ConfigContext.Provider value={{
      username: 'admin',
      passwordHash: 'password',
      password: 'password',
      setPassword: jest.fn()
    }}>
      <MemoryRouter initialEntries={[`/search/${searchType}`]}>
        <Routes>
          <Route path="/search/:searchType" element={<SearchEmployee />} />
        </Routes>
      </MemoryRouter>
    </ConfigContext.Provider>
  );
};

test('renders SearchEmployee component with employee data', async () => {
  renderComponent();

  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(screen.getByText('Doe')).toBeInTheDocument();
});

test('filters by employee ID', async () => {
  renderComponent();

  await waitFor(() => screen.getByText('John'));

  fireEvent.change(screen.getAllByRole('textbox')[0], {
    target: { value: '2' },
  });
  fireEvent.click(screen.getByText('Search by ID'));

  expect(await screen.findByText('Jane')).toBeInTheDocument();
  expect(screen.queryByText('John')).not.toBeInTheDocument();
});

test('filters by first name', async () => {
  renderComponent();

  await waitFor(() => screen.getByText('John'));

  fireEvent.change(screen.getAllByRole('textbox')[1], {
    target: { value: 'Jane' },
  });
  fireEvent.click(screen.getByText('Search by First Name'));

  expect(await screen.findByText('Jane')).toBeInTheDocument();
  expect(screen.queryByText('John')).not.toBeInTheDocument();
});

test('filters by last name', async () => {
  renderComponent();

  await waitFor(() => screen.getByText('John'));

  fireEvent.change(screen.getAllByRole('textbox')[2], {
    target: { value: 'Doe' },
  });
  fireEvent.click(screen.getByText('Search by Last Name'));

  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(screen.queryByText('Jane')).not.toBeInTheDocument();
});
