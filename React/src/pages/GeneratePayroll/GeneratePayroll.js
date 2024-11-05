import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import PayrollInfo from '../_payrollInfo/PayrollInfo';
import DeductionsInfo from '../_deductionsInfo/DeductionsInfo';
import styles from './GeneratePayroll.module.css'
import global from '../../global.module.css'
import Header from '../_header/Header';

const GeneratePayroll = () => {
    const { id, fname, lname } = useParams();
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
    const [results, setResults] = useState({
        payroll: 0,
        deductions: 0,
        total: 0
    });

    const [placeholderFile, setPlaceholderFile] = useState(null);

    const generateEmail = () => {
        const emailContent = "test email";
        const blob = new Blob([emailContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        setPlaceholderFile(url);
    };

    const sendEmail = () => {
        const hardcodedEmail = "diego_martin_herrera@dlsu.edu.ph"; // hardcoded for testing purposes, change if you want to try out
        const subject = "Test";
        const body = "Please see attached file";

        const encodedEmail = encodeURIComponent(hardcodedEmail);
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
    
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedEmail}&su=${encodedSubject}&body=${encodedBody}`;
        window.open(gmailUrl, '_blank');
    };
    
    const calculatePayroll = () => {
        const { ot, salaryIncrease, mealAllow, bdayBonus, incentive, otherPayrollInfo } = payrollInfo;
        const { cashAdvance, healthCard, absences, otherDeductions } = deductions;
        const payroll_total = parseFloat(ot) + parseFloat(salaryIncrease) + parseFloat(mealAllow) +
                        parseFloat(bdayBonus) + parseFloat(incentive) + parseFloat(otherPayrollInfo);
        const deductions_total = parseFloat(cashAdvance) + parseFloat(healthCard) +
                        parseFloat(absences) + parseFloat(otherDeductions);
        const total = payroll_total - deductions_total;

        setResults({ payroll: payroll_total, deductions: deductions_total, total: total });
    };

    return (
        <div className={global.wrapper}>
            <Sidebar></Sidebar>
            <div>
            <Header></Header>

        <div className={`${styles.container} ${global.mainContent}`}>
            <h1><span className={global.title}>Generate Payroll for {fname} {lname}</span></h1>

            <PayrollInfo payrollInfo={payrollInfo} setPayrollInfo={setPayrollInfo} />
            <DeductionsInfo deductions={deductions} setDeductions={setDeductions} />
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={calculatePayroll}>Calculate</button>
            </div>
            
            <div className={styles.resultSection}>
                <p>Results</p>
                <div>
                    <label>Payroll: </label>
                    <span>{results.payroll.toFixed(2)}</span>
                </div>
                <div>
                    <label>Deductions: </label>
                    <span>{results.deductions.toFixed(2)}</span>
                </div>
                <div>
                    <label>Total: </label>
                    <span>{results.total.toFixed(2)}</span>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={generateEmail}>Email to Employee</button>
                    {placeholderFile && (
                        <div>
                            <h3>Preview: </h3>
                            <a href={placeholderFile} target="_blank" rel="noopener noreferrer">
                            View Test File
                            </a>
                            <button onClick={sendEmail}>Email Test File</button>
                        </div>
                    )}
                </div>
            </div>
        </div>


            </div>
        </div>
    );
};

export default GeneratePayroll;
