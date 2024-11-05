import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar'
import global from '../../global.module.css';
import TempHeader from '../_header/TempHeader';

const MainMenu = () => {
    return (
      <div className={global.wrapper}>
        <Sidebar></Sidebar>
        <div className={global.content}>
          <TempHeader></TempHeader>
          <div>
            <h1>Main Menu</h1>
            <Link to="/SetDefaults"> Set Defaults </Link> <br></br>
            <Link to="/SearchEmployee/ViewPayrollHistory"> View Payroll History </Link> <br></br>
            <Link to="/SearchEmployee/CalculatePayroll"> Generate Employee Payroll </Link> <br></br>
            <Link to="/"> Exit </Link> <br></br>
          </div>
        </div>
      </div>
    );
  };
  
export default MainMenu;