import React from 'react';
import styles from './DeductionsInfo.module.css'

const DeductionsInfo = ({ deductions, setDeductions }) => (
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
            <label>Late/Absent:</label>
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
    </div>
);

export default DeductionsInfo;