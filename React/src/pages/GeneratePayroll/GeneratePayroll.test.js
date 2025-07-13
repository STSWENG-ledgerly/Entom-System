// GeneratePayroll.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ConfigContext } from '../../ConfigContext';
import GeneratePayroll from './GeneratePayroll';

const mockConfig = {
  rate: 100,
  basic: 10000,
};

const mockCreateUserPayment = jest.fn();
const mockSetSelectedEmployeeId = jest.fn();

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/getEmail')) {
      return Promise.resolve({
        json: () => Promise.resolve([{ email: 'test@example.com' }]),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders GeneratePayroll and fetches email', async () => {
  render(
    <ConfigContext.Provider
      value={{
        config: mockConfig,
        createUserPayment: mockCreateUserPayment,
        setSelectedEmployeeId: mockSetSelectedEmployeeId,
      }}
    >
      <MemoryRouter initialEntries={['/generate/1/John/Doe']}>
        <Routes>
          <Route path="/generate/:id/:fname/:lname" element={<GeneratePayroll />} />
        </Routes>
      </MemoryRouter>
    </ConfigContext.Provider>
  );

  // Heading should show employee name
  expect(
    await screen.findByRole('heading', { name: /generate payroll for john doe/i })
  ).toBeInTheDocument();

  // Info title should exist
  expect(
    screen.getByText(/input all the information needed/i)
  ).toBeInTheDocument();

  // Should call setSelectedEmployeeId with correct id
  await waitFor(() => {
    expect(mockSetSelectedEmployeeId).toHaveBeenCalledWith('1');
  });
});
