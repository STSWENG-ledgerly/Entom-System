import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import MainMenu from './pages/MainMenu/MainMenu';
import SetDefaults from './pages/SetDefaults/SetDefaults';
import SearchEmployee from './pages/SearchEmployee/SearchEmployee';
import ViewPayment from './pages/ViewPayment/ViewPayment';
import GeneratePayroll from './pages/GeneratePayroll/GeneratePayroll';
import EditPayroll from './pages/EditPayroll/EditPayroll';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import EditEmployee from './pages/EditEmployee/EditEmployee';
import EditEmployeeForm from './pages/EditEmployee/EditEmployeeForm.js';
import { ConfigProvider } from './ConfigContext';
import ProtectedRoutes from './ProtectedRoutes'

function App() {
  // setup all available/possible links within the app
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoutes />}>

            <Route path="/MainMenu" element={<MainMenu />} />
            <Route path="/SetDefaults" element={<SetDefaults />} />
            <Route path="/SearchEmployee/:searchType" element={<SearchEmployee />} />
            <Route path="/ViewPayment/:id/:fname/:lname" element={<ViewPayment />} />
            <Route path="/GeneratePayroll/:id/:fname/:lname" element={<GeneratePayroll />} />
            <Route path="/EditPayroll/:id/:payment_id/:fname/:lname" element={<EditPayroll />} />
            <Route path="/AddEmployee" element={<AddEmployee />} />
            <Route path="/EditEmployee" element={<EditEmployee />} />
            <Route path="/EditEmployee/:id" element={<EditEmployeeForm />} />
          </Route>

        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
