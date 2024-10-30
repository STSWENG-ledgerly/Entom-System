import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
      <div>
        <h1>Main Menu</h1>
        <Link to="/SetDefaults"> Set Defaults </Link> <br></br>
        <Link to="/SearchEmployee/ViewPayrollHistory"> View Payroll History </Link> <br></br>
        <Link to="/SearchEmployee/CalculatePayroll"> Generate Employee Payroll </Link> <br></br>
        <Link to="/"> Exit </Link> <br></br>
      </div>
    );
  };
  
export default MainMenu;