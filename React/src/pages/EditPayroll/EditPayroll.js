import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import PayrollInfo from '../_payrollInfo/PayrollInfo';
import DeductionsInfo from '../_deductionsInfo/DeductionsInfo';
import styles from './EditPayroll.module.css'
import Header from '../_header/Header';
import global from '../../global.module.css';

const EditPayroll = () => {
    const { id, fname, lname } = useParams();  // params passed from previous pages
    //vars
    const [payrollInfo, setPayrollInfo] = useState({
      date: '',
      ot: 0,
      salaryIncrease: 0,
      mealAllow: 0,
      bdayBonus: 0,
      incentive: 0,
      otherPayrollInfo: 0
    });
    const [deductions, setDeductions] = useState({
      cashAdvance: 0,
      healthCard: 0,
      absences: 0,
      otherDeductions: 0
    });

    return (
      <div className={global.wrapper}>
        <Sidebar></Sidebar>
        <div>
            <Header></Header>

      <div className={`${styles.container} ${global.mainContent}`}>
            <h1><span className={global.title}>Edit Payroll for {fname} {lname}</span></h1>

            <PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />
            <DeductionsInfo deductions={deductions} setDeductions={setDeductions} />
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Save</button>
            </div>
        </div>

        </div>
      </div>
    );
  };
  
export default EditPayroll;