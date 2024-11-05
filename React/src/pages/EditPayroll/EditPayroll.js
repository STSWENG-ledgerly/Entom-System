import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../_header/Header';
import PayrollInfo from '../_payrollInfo/PayrollInfo';
import DeductionsInfo from '../_deductionsInfo/DeductionsInfo';
import styles from './EditPayroll.module.css'

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

    //Audrey
    return (
      <div className={styles.container}>
            <h1>Edit Payroll for {fname} {lname}</h1>
            <Header></Header>

            <PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />
            <DeductionsInfo deductions={deductions} setDeductions={setDeductions} />
            <div className={styles.buttonContainer}>
                <button className={styles.button}>Save</button>
            </div>
        </div>
    );
  };
  
export default EditPayroll;