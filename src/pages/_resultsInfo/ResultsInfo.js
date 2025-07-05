import React from 'react';
import styles from './ResultsInfo.module.css';

const ResultsInfo = ({ results }) => {
    return (
        <div>
            <div className={styles.formGroup}>
                <label>BASIC SALARY:</label>
                <input value={parseFloat(results.basic).toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label>ADDITIONS/ ALLOWANCES:</label>
                <input value={parseFloat(results.additions).toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label>GROSS SALARY:</label>
                <input value={parseFloat(results.payroll).toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label>DEDUCTIONS:</label>
                <input value={parseFloat(results.deductions).toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label>NET PAY:</label>
                <input value={parseFloat(results.total).toFixed(2)} readOnly />
            </div>
        </div>
    );
};

export default ResultsInfo;
