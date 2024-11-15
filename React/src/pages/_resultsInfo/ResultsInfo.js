import React from 'react';
import styles from './ResultsInfo.module.css';

const ResultsInfo = ({ results }) => {
    return (
        <div>
            <div className={styles.formGroup}>
                <label>PAYROLL: </label>
                <input value={results.payroll.toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label>DEDUCTIONS: </label>
                <input value={results.deductions.toFixed(2)} readOnly />
            </div>
            <div className={styles.formGroup}>
                <label>TOTAL: </label>
                <input value={results.total.toFixed(2)} readOnly />
            </div>
        </div>
    );
};

export default ResultsInfo;
