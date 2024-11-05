import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../_header/Header';
import styles from './GeneratePayroll.module.css'

//Audrey
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
    //change logic
    const calculatePayroll = () => {
        const { ot, salaryIncrease, mealAllow, bdayBonus, incentive, otherPayrollInfo } = payrollInfo;
        const { cashAdvance, healthCard, absences, otherDeductions } = deductions;
        const payroll_total = 0;
        const deductions_total = 0;
        const total = 0;

        setResults({ payroll_total, deductions_total, total });
    };

    return (
        <div className={styles.container}>
            <h1>Generate Payroll for {fname} {lname}</h1>
            <Header></Header>

            <div className={styles.formSection}>
                <p>Input all the information needed</p>
                <div className={styles.formGroup}>
                    <label>Date:</label>
                    <input
                        type="date" value={payrollInfo.date}
                        onChange={(e) => setPayrollInfo({ ...payrollInfo, date: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>OT:</label>
                    <input
                        type="number" value={payrollInfo.ot}
                        onChange={(e) => setPayrollInfo({ ...payrollInfo, ot: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Salary Increase:</label>
                    <input
                        type="number" value={payrollInfo.salaryIncrease}
                        onChange={(e) => setPayrollInfo({ ...payrollInfo, salaryIncrease: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Meal Allow:</label>
                    <input
                        type="number" value={payrollInfo.mealAllow}
                        onChange={(e) => setPayrollInfo({ ...payrollInfo, mealAllow: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Birthday Bonus:</label>
                    <input
                        type="number" value={payrollInfo.bdayBonus}
                        onChange={(e) => setPayrollInfo({ ...payrollInfo, bdayBonus: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Incentive:</label>
                    <input
                        type="number" value={payrollInfo.incentive}
                        onChange={(e) => setPayrollInfo({ ...payrollInfo, incentive: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Others:</label>
                    <input
                        type="number" value={payrollInfo.otherPayrollInfo}
                        onChange={(e) => setPayrollInfo({ ...payrollInfo, otherPayrollInfo: e.target.value })}
                    />
                </div>
            </div>

            <div className={styles.formSection}>
                <p>Deductions</p>
                <div className={styles.formGroup}>
                    <label>Cash Advance:</label>
                    <input
                        type="number" value={deductions.cashAdvance}
                        onChange={(e) => setDeductions({ ...deductions, cashAdvance: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Health Card:</label>
                    <input
                        type="number" value={deductions.healthCard}
                        onChange={(e) => setDeductions({ ...deductions, healthCard: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Absences:</label>
                    <input
                        type="number" value={deductions.absences}
                        onChange={(e) => setDeductions({ ...deductions, absences: e.target.value })}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Others:</label>
                    <input
                        type="number" value={deductions.otherDeductions}
                        onChange={(e) => setDeductions({ ...deductions, otherDeductions: e.target.value })}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={calculatePayroll}>Calculate</button>
                </div>
            </div>

            <div className={styles.resultSection}>
                <p>Results</p>
                <div>
                    <label>Payroll: </label>
                    <span>{results.payroll_total}</span>
                </div>
                <div>
                    <label>Deductions: </label>
                    <span>{results.deductions_total}</span>
                </div>
                <div>
                    <label>Total: </label>
                    <span>{results.total}</span>
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
    );
};

export default GeneratePayroll;
