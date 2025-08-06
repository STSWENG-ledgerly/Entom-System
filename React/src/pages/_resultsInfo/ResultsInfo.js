import React from 'react';
import styles from './ResultsInfo.module.css';

const ResultsInfo = ({ results }) => {
    return (
        <div>
            <div className={styles.formGroup}>
                <label htmlFor="payroll">PAYROLL: </label>
                <input id="payroll" value={parseFloat(results.payroll).toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="deductions">DEDUCTIONS: </label>
                <input id="deductions" value={parseFloat(results.deductions).toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="total">TOTAL: </label>
                <input id="total" value={parseFloat(results.total).toFixed(2)} readOnly />
            </div>
        </div>
    );
};

export default ResultsInfo;

