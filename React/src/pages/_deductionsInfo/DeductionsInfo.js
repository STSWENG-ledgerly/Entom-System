import React from 'react';
import styles from './DeductionsInfo.module.css'

const checkNumberInput = (e, setState, field) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    setState((prevState) => ({
        ...prevState,
        [field]: value,
    }));
};

const DeductionsInfo = ({ deductions, setDeductions }) => (
    <div className={styles.formSection}>
        <span>DEDUCTIONS</span>
        <div className={styles.formGroup}>
            <label>SSS:</label>
            <input
                type="number" value={deductions.sss}
                onChange={(e) => checkNumberInput(e, setDeductions, "sss")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Philhealth:</label>
            <input
                type="number" value={deductions.philhealth}
                onChange={(e) => checkNumberInput(e, setDeductions, "philhealth")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>PAG-IBIG:</label>
            <input
                type="number" value={deductions.pagibig}
                onChange={(e) => checkNumberInput(e, setDeductions, "pagibig")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Cash Advance:</label>
            <input
                type="number" value={deductions.cashAdvance}
                onChange={(e) => checkNumberInput(e, setDeductions, "cashAdvance")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Health Card:</label>
            <input
                type="number" value={deductions.healthCard}
                onChange={(e) => checkNumberInput(e, setDeductions, "healthCard")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Late/Absent:</label>
            <input
                type="number" value={deductions.absences}
                onChange={(e) => checkNumberInput(e, setDeductions, "absences")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Others:</label>
            <input
                type="number" value={deductions.otherDeductions}
                onChange={(e) => checkNumberInput(e, setDeductions, "otherDeductions")}
            />
        </div>
    </div>
);

export default DeductionsInfo;