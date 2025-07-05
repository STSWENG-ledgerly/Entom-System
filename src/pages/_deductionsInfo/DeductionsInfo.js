import React from 'react';
import styles from './DeductionsInfo.module.css';

const checkNumberInput = (e, setState, field) => {
    const value = Math.max(0, parseFloat(e.target.value).toFixed(2) || 0);
    setState((prevState) => ({
        ...prevState,
        [field]: value,
    }));
};

const handleBlur = (e, setState, field) => {
    if (isNaN(parseFloat(e.target.value).toFixed(2))) {
        setState((prevState) => ({
            ...prevState,
            [field]: 0,
        }));
    }
};

const DeductionsInfo = ({ deductions, setDeductions }) => (
    <div className={styles.formSection}>
        <span>DEDUCTIONS</span>
        <div className={styles.formGroup}>
            <label>SSS:</label>
            <input
                type="number"
                value={deductions.sss ?? 0}
                onChange={(e) => checkNumberInput(e, setDeductions, "sss")}
                onBlur={(e) => handleBlur(e, setDeductions, "sss")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>philHealth:</label>
            <input
                type="number"
                value={deductions.philHealth ?? 0}
                onChange={(e) => checkNumberInput(e, setDeductions, "philHealth")}
                onBlur={(e) => handleBlur(e, setDeductions, "philHealth")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>PAG-IBIG:</label>
            <input
                type="number"
                value={deductions.pagIbig ?? 0}
                onChange={(e) => checkNumberInput(e, setDeductions, "pagIbig")}
                onBlur={(e) => handleBlur(e, setDeductions, "pagIbig")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Cash Advance:</label>
            <input
                type="number"
                value={deductions.cashAdvance ?? 0}
                onChange={(e) => checkNumberInput(e, setDeductions, "cashAdvance")}
                onBlur={(e) => handleBlur(e, setDeductions, "cashAdvance")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Health Card:</label>
            <input
                type="number"
                value={deductions.healthCard ?? 0}
                onChange={(e) => checkNumberInput(e, setDeductions, "healthCard")}
                onBlur={(e) => handleBlur(e, setDeductions, "healthCard")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Late/Absent:</label>
            <input
                type="number"
                value={deductions.lateAbsent ?? 0}
                onChange={(e) => checkNumberInput(e, setDeductions, "lateAbsent")}
                onBlur={(e) => handleBlur(e, setDeductions, "lateAbsent")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Others:</label>
            <input
                type="number"
                value={deductions.otherDeductions ?? 0}
                onChange={(e) => checkNumberInput(e, setDeductions, "otherDeductions")}
                onBlur={(e) => handleBlur(e, setDeductions, "otherDeductions")}
            />
        </div>
    </div>
);

export default DeductionsInfo;
