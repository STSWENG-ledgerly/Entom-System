import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar'
import global from '../../global.module.css';
import Header from '../_header/Header';
import styles from './MainMenu.module.css';

const MainMenu = () => {
  const handleExit = () => {
    sessionStorage.removeItem('userValid');
  };

  return (
    <div className={global.wrapper}>
      <Sidebar></Sidebar>
      <div>
        <Header></Header>
        <div className={global.mainContent}>
          {/* <h1><span className={global.title}>MAIN MENU</span></h1> */}
          <div className={styles.menuWrapper}>
            <div className={styles.gridContainer}>
              <Link to="/SetDefaults">
                <div className={styles.imageSwapContainer}>
                  <img src='/images/set-greyed.png' alt='set rates grayed' className={styles.imageGray} />
                  <img src='/images/set.png' alt='set rates hovered' className={styles.imageColor} />
                </div>
                <span>Set Default Rates</span>
              </Link>
              <Link to="/SearchEmployee/CalculatePayroll">
                <div className={styles.imageSwapContainer}>
                  <img src='/images/generate-greyed.png' alt='set rates grayed' className={styles.imageGray} />
                  <img src='/images/generate.png' alt='set rates hovered' className={styles.imageColor} />
                </div>
                <span>Generate Employee Payroll</span>
              </Link>
              <Link to="/SearchEmployee/ViewPayrollHistory">
                <div className={styles.imageSwapContainer}>
                  <img src='/images/history-greyed.png' alt='set rates grayed' className={styles.imageGray} />
                  <img src='/images/history.png' alt='set rates hovered' className={styles.imageColor} />
                </div>
                <span>View Payroll History</span>
              </Link>
              <Link to="/" onClick={handleExit}>
                <div className={styles.imageSwapContainer}>
                  <img src='/images/set-greyed.png' alt='set rates grayed' className={styles.imageGray} />
                  <img src='/images/set.png' alt='set rates hovered' className={styles.imageColor} />
                </div>
                <span>Exit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default MainMenu;
