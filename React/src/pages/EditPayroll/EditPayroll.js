
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import PayrollInfo from '../_payrollInfo/PayrollInfo';
import DeductionsInfo from '../_deductionsInfo/DeductionsInfo';
import ResultsInfo from '../_resultsInfo/ResultsInfo';
import { calculatePayroll } from '../_calculatePayroll/CalculatePayroll';
import styles from './EditPayroll.module.css'
import Header from '../_header/Header';
import global from '../../global.module.css';
import { ConfigContext, BASE_URL } from '../../ConfigContext';

const EditPayroll = () => {
  const navigate = useNavigate();
  const { id, payment_id, fname, lname } = useParams();  // params passed from previous pages
  const { config } = useContext(ConfigContext);
  const defaultPayrollInfo = {
    date: '',
    ot: 0,
    salaryIncrease: 0,
    mealAllow: 0,
    bdayBonus: 0,
    incentive: 0,
    otherPayrollInfo: 0
  };

  const defaultDeductions = {
    sss: 0,
    philhealth: 0,
    pagibig: 0,
    cashAdvance: 0,
    healthCard: 0,
    absences: 0,
    otherDeductions: 0
  };

  const [payrollInfo, setPayrollInfo] = useState(defaultPayrollInfo);
  const [deductions, setDeductions] = useState(defaultDeductions);

  const [results, setResults] = useState(calculatePayroll(payrollInfo, deductions, config));
  const [defaults, setDefaults] = useState(config);
  const [savedStatus, setSavedStatus] = useState("Saved to Database!");
  const [isVisible, setIsVisible] = useState(false);

  // save new values to DB
  const saveUserPayrollData = () => {
  const newResults = calculatePayroll(payrollInfo, deductions, defaults);
  setResults(newResults);

  const editedPayment = {
    allowances: {
      mealAllowance:   payrollInfo.mealAllow,
      birthdayBonus:   payrollInfo.bdayBonus,
      incentives:      payrollInfo.incentive,
      otherAdditions:  payrollInfo.otherPayrollInfo
    },
    // you can build overtimeDetails here if your UI supported it…
    overtimeDetails: [],

    grossSalary:    newResults.payroll,
    totalDeductions:newResults.deductions,

    deductions: {
      tax:           0,               
      sss:           deductions.sss,
      philHealth:    deductions.philhealth,
      pagIbig:       deductions.pagibig,
      healthCard:    deductions.healthCard,
      cashAdvance:   deductions.cashAdvance,
      lateAbsent:    deductions.absences,
      otherDeductions: deductions.otherDeductions
    },

    total:          newResults.total,    

    paymentMode:   defaults.paymentMode || 'Bank Transfer',
    isApproved:    true
  };

  fetch(`${BASE_URL}/editPayment/${payment_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editedPayment)
  })
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);

  handleFadeOut();
};

  // setup prev values into input boxes
  useEffect(() => {
  if (!payment_id) return;

  fetch(`${BASE_URL}/getPayment/${payment_id}`)
    .then(res => res.json())
    .then(data => {
      const prevPayroll = {
        date: new Date(data.payDate).toISOString().slice(0,10),
        ot: data.overtimeDetails.length,              
        salaryIncrease: data.salaryIncrease || 0,      
        mealAllow: data.allowances.mealAllowance,
        bdayBonus: data.allowances.birthdayBonus,
        incentive: data.allowances.incentives,
        otherPayrollInfo: data.allowances.otherAdditions
      };
      const prevDeductions = {
        sss: data.deductions.sss,
        philhealth: data.deductions.philHealth,
        pagibig: data.deductions.pagIbig,
        cashAdvance: data.deductions.cashAdvance,
        healthCard: data.deductions.healthCard,
        absences: data.deductions.lateAbsent,
        otherDeductions: data.deductions.otherDeductions
      };
      const results = {
        payroll: data.grossSalary,
        deductions: data.totalDeductions,
        total: data.total
      };
      const defaults = {
        rate: data.rate,
        basic: data.basic
      };

      setPayrollInfo(prevPayroll);
      setDeductions(prevDeductions);
      setResults(results);
      setDefaults(defaults);
    })
    .catch(err => console.error(err));
  }, [payment_id]);

  const handleFadeOut = () => {
    setIsVisible(false); 
    setTimeout(() => setIsVisible(true)); 
  };

  const checkNumberInput = (e, setState, field) => {
    const value = Math.max(0, parseFloat(e.target.value).toFixed(2) || 0);
    setState((prevState) => ({
        ...prevState,
        [field]: value,
    }));
  };

  const handleBlur = (e, setState, field) => {
      if (isNaN(parseFloat(e.target.value).toFixed(2))) {
          console.log('pain');
          setState((prevState) => ({
              ...prevState,
              [field]: 0,
          }));
      }
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
                <div className={styles.formGroup}>
                  <label>RATE: </label>
                  <input value={defaults.rate} 
                      type='number' 
                      onChange={(e) => checkNumberInput(e, setDefaults, "rate")}
                      onBlur={(e) => handleBlur(e, setDefaults, "rate")}
                      />
                </div>
                <div className={styles.formGroup}>
                    <label>BASIC: </label>
                    <input value={defaults.basic} 
                      type="number" 
                      onChange={(e) => checkNumberInput(e, setDefaults, "basic")}
                      onBlur={(e) => handleBlur(e, setDefaults, "basic")}
                      />
                </div>
                <br></br>
                <div className={styles.formSection}><span>RESULTS</span></div>
                <ResultsInfo results={results} />
                <div className={`${styles.formGroup} ${isVisible ? global.fadeOut : global.opacity0}`}>
                    <span> {savedStatus} </span>
                </div>
              </div>
           
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

