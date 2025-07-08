// ViewPayment.test.js

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import ViewPayment from './ViewPayment';

// Mock useNavigate and useParams
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
    useParams: () => ({ id: '123', fname: 'John', lname: 'Doe' }),
  };
});

const mockPaymentData = [
  {
    _id: 'p1',
    payDate: '2024-12-01T00:00:00Z',
    total: 12000.5,
    formatted_date: '2024-12-01',
  },
];

const mockContext = {
  getAllUserPayments: jest.fn(),
  deleteUserPayment: jest.fn(),
};

const renderComponent = () => {
  return render(
    <ConfigContext.Provider value={mockContext}>
      <MemoryRouter initialEntries={['/view/123/John/Doe']}>
        <Routes>
          <Route path="/view/:id/:fname/:lname" element={<ViewPayment />} />
        </Routes>
      </MemoryRouter>
    </ConfigContext.Provider>
  );
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockPaymentData),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ViewPayment Component', () => {
  test('renders heading with correct name', async () => {
    renderComponent();
    expect(await screen.findByText(/Payroll History of John Doe/)).toBeInTheDocument();
  });

  test('fetches and displays payroll records', async () => {
    renderComponent();
    expect(await screen.findByText('December 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('P 12000.50')).toBeInTheDocument();
    expect(screen.getByText('EDIT')).toBeInTheDocument();
    expect(screen.getByText('DELETE')).toBeInTheDocument();
  });

  test('shows delete popup when DELETE is clicked', async () => {
    renderComponent();
    fireEvent.click(await screen.findByText('DELETE'));

    await waitFor(() => {
      // Assumes Popup renders confirmation content
      expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
    });
  });
 
  test('shows "no records" when payment list is empty', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    renderComponent();
    expect(await screen.findByText(/No payroll history records found/i)).toBeInTheDocument();
  });
});


// Testing here
