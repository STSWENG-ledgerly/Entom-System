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
    philHealth: 0,
    pagIbig: 0,
    cashAdvance: 0,
    healthCard: 0,
    lateHours: 0,
    absentDays: 0,
    otherDeductions: 0
  };

  const [payrollInfo, setPayrollInfo] = useState(defaultPayrollInfo);
  const [deductions, setDeductions] = useState(defaultDeductions);

  const [results, setResults] = useState({ payroll: 0, deductions: 0, total: 0 });
  const [defaults, setDefaults] = useState(config);
  const [savedStatus, setSavedStatus] = useState("Saved to Database!");
  const [isVisible, setIsVisible] = useState(false);

  const otHours = parseFloat(payrollInfo.ot) || 0;
  const otRate = parseFloat(defaults.rate) || 0;
  const otTotal = otHours * otRate;

  // save new values to DB
  const saveUserPayrollData = () => {
  const newResults = calculatePayroll(payrollInfo, deductions, defaults);
  setResults(newResults);

  const editedPayment = {
    payDate: payrollInfo.date,    
    allowances: {
        overtimePay: otTotal,
        mealAllowance: payrollInfo.mealAllow,
        birthdayBonus: payrollInfo.bdayBonus,
        incentives: payrollInfo.incentive,
        otherAdditions: payrollInfo.otherPayrollInfo
      },
      overtimeDetails: {
        hours: otHours,
        rate: otRate,
        total: otTotal
      },
    grossSalary:    newResults.payroll,
    totalDeductions:newResults.deductions,

    deductions: {
      tax:           0,               
      sss:           deductions.sss,
      philHealth:    deductions.philHealth,
      pagIbig:       deductions.pagIbig,
      healthCard:    deductions.healthCard,
      cashAdvance:   deductions.cashAdvance,
      lateHours:    deductions.lateHours,
      absentDays:     deductions.absentDays,
      otherDeductions: deductions.otherDeductions
    },

    total:         newResults.total,    
    paymentMode:   defaults.paymentMode || 'Bank Transfer',
    isApproved:    true,

    payrollInfo,
    deductions
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
    
    const company = sessionStorage.getItem('company');

    fetch(`${BASE_URL}/getPayment/${payment_id}?company=${encodeURIComponent(company)}`)
      .then(res => res.json())
      .then(data => {
        const prevPayroll = {
          date: new Date(data.payDate).toISOString().slice(0,10),
          ot: data.overtimeDetails?.hours ?? 0,
          salaryIncrease: data.salaryIncrease ?? 0,
          mealAllow: data.allowances?.mealAllowance ?? 0,
          bdayBonus: data.allowances?.birthdayBonus ?? 0,
          incentive: data.allowances?.incentives ?? 0,
          otherPayrollInfo: data.allowances?.otherAdditions ?? 0,
        };

        const prevDeductions = {
          sss: data.deductions?.sss ?? 0,
          philHealth: data.deductions?.philHealth ?? 0,
          pagIbig: data.deductions?.pagIbig ?? 0,
          cashAdvance: data.deductions?.cashAdvance ?? 0,
          healthCard: data.deductions?.healthCard ?? 0,
          lateHours: data.deductions?.lateHours ?? 0,
          absentDays: data.deductions?.absentDays ?? 0,
          otherDeductions: data.deductions?.otherDeductions ?? 0,
        };

        const results = {
          payroll: data.grossSalary ?? 0,
          deductions: data.totalDeductions ?? 0,
          total: data.total ?? 0,
        };

        setPayrollInfo(prevPayroll);
        setDeductions(prevDeductions);
        setResults(results);

        // ✅ Fetch the employee's current config using `data.employee`
        if (data.employee) {
          fetch(`${BASE_URL}/getEmployeeDetails/${data.employee}`)
            .then(res => res.json())
            .then(emp => {
              setDefaults({
                rate: emp.overtimeRate ?? 0,
                basic: emp.basicSalary ?? 0,
              });
            })
            .catch(err => {
              console.error("❌ Error fetching employee config during edit:", err.message);
            });
        } else {
          console.warn("⚠️ No employee ID found in payment record");
        }
      })
      .catch(err => console.error("❌ Error fetching payment:", err));
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

export default EditPayroll;