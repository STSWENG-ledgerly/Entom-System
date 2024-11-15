import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import PayrollInfo from '../_payrollInfo/PayrollInfo';
import DeductionsInfo from '../_deductionsInfo/DeductionsInfo';
import ResultsInfo from '../_resultsInfo/ResultsInfo';
import { calculatePayroll } from '../_calculatePayroll/CalculatePayroll';
import styles from './EditPayroll.module.css'
import Header from '../_header/Header';
import global from '../../global.module.css';
import { ConfigContext } from '../../ConfigContext';

//Audrey
const EditPayroll = () => {
  const navigate = useNavigate();
  const { id, payment_id, fname, lname } = useParams();  // params passed from previous pages

  const { config } = useContext(ConfigContext);
  const { getUserPayment, saveUserPayment } = useContext(ConfigContext);
  const userSavedPayment = getUserPayment(id, payment_id) || { payrollInfo: {}, deductions: {} };
  const [payrollInfo, setPayrollInfo] = useState(userSavedPayment.payrollInfo);
  const [deductions, setDeductions] = useState(userSavedPayment.deductions);
  const [results, setResults] = useState(calculatePayroll(payrollInfo, deductions, config));

  const showPayrollResults = () => {
    setResults(calculatePayroll(payrollInfo, deductions, config));
  };

  const saveUserPayrollData = () => {
    const newData = { payrollInfo, deductions };
    saveUserPayment(id, payment_id, newData);
    showPayrollResults();

    //navigate(`../ViewPayment/${id}/${fname}/${lname}`);
  };

  return (
    <div className={global.wrapper}>
      <Sidebar></Sidebar>
      <div>
        <Header></Header>

        <div className={`${styles.container} ${global.mainContent}`}>
          <h1><span className={global.title}>Edit Payroll for {fname} {lname}</span></h1>

          <div className={styles.box}>
            <span id={styles.infoTitle}>INPUT ALL THE INFORMATION NEEDED</span>
            <div className={styles.infoSection}>
              <div className={styles.formsSection}>
                <PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />
                <DeductionsInfo deductions={deductions} setDeductions={setDeductions} />
                <div className={styles.buttonContainer}>
                  <button className={styles.button} onClick={saveUserPayrollData}>SAVE</button>
                </div>
              </div>

              <div className={styles.resultSection}>
                <ResultsInfo results={results} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditPayroll;