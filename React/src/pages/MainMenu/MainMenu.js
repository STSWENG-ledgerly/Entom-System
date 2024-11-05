import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar'
import global from '../../global.module.css';
import TempHeader from '../_header/TempHeader';
import styles from './MainMenu.module.css';

const MainMenu = () => {
    return (
      <div className={global.wrapper}>
        <Sidebar></Sidebar>
        <div>
          <TempHeader></TempHeader>
          <div className={global.mainContent}>
            <h1><span className={global.title}>MAIN MENU</span></h1>
            <div className={styles.links}>
              <Link to="/SetDefaults"> Set Defaults </Link> <br></br>
              <Link to="/SearchEmployee/ViewPayrollHistory"> View Payroll History </Link> <br></br>
              <Link to="/SearchEmployee/CalculatePayroll"> Generate Employee Payroll </Link> <br></br>
              <Link to="/"> Exit </Link> <br></br>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default MainMenu;