import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import MainMenu from './pages/MainMenu/MainMenu';
import SetDefaults from './pages/SetDefaults/SetDefaults';
import SearchEmployee from './pages/SearchEmployee/SearchEmployee';
import ViewPayment from './pages/ViewPayment/ViewPayment';
import GeneratePayroll from './pages/GeneratePayroll/GeneratePayroll';
import EditPayroll from './pages/EditPayroll/EditPayroll';


function App() {
  // setup all available/possible links within the app
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/MainMenu" element={<MainMenu />} />
        <Route path="/SetDefaults" element={<SetDefaults />} />
        <Route path="/SearchEmployee/:searchType" element={<SearchEmployee />} />
        <Route path="/ViewPayment/:id/:fname/:lname" element={<ViewPayment/>} />
        <Route path="/GeneratePayroll/:id/:fname/:lname" element={<GeneratePayroll />} />
        <Route path="/EditPayroll/:payment_id/:fname/:lname" element={<EditPayroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
