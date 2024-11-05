import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Header = () => {
    const navigate = useNavigate();

    const handleMenu= () => {
        navigate('/MainMenu');
    };

    const handleDefa= () => {
        navigate('/SetDefaults');
    };

    const handleHist= () => {
        navigate('/SearchEmployee/ViewPayrollHistory');
    };

    const handleCalc= () => {
        navigate('/SearchEmployee/CalculatePayroll');
    };

    const handleBack= () => {
        navigate(-1);
    };

    return (
      <div className={styles.background}>
        <button className={styles.menuButton} onClick={handleMenu}>  </button> <br></br>
        <button className={styles.defaButton} onClick={handleDefa}>  </button> <br></br>
        <button className={styles.histButton} onClick={handleHist}>  </button> <br></br>
        <button className={styles.calcButton} onClick={handleCalc}>  </button> <br></br>
        <button className={styles.prevButton} onClick={handleBack}>  </button> <br></br>
      </div>
    );
  };
  
export default Header;