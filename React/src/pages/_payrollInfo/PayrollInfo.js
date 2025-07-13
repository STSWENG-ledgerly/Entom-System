import React from 'react';
import styles from './PayrollInfo.module.css';

const checkNumberInput = (e, setState, field) => {
    let value = Math.max(0, parseFloat(e.target.value).toFixed(2) || 0);
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

const PayrollInfo = ({ payrollInfo, setPayrollInfo }) => (
    <div className={styles.formSection}>
        <div className={styles.formGroup}>
            <label>Date:</label>
            <input
                type="date"
                value={payrollInfo.date ?? ''}
                onChange={(e) => setPayrollInfo({ ...payrollInfo, date: e.target.value })}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Overtime (in Days):</label>
            <input
                type="number"
                value={payrollInfo.ot ?? 0}
                onChange={(e) => checkNumberInput(e, setPayrollInfo, "ot")}
                onBlur={(e) => handleBlur(e, setPayrollInfo, "ot")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Salary Increase:</label>
            <input
                type="number"
                value={payrollInfo.salaryIncrease ?? 0}
                onChange={(e) => checkNumberInput(e, setPayrollInfo, "salaryIncrease")}
                onBlur={(e) => handleBlur(e, setPayrollInfo, "salaryIncrease")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Meal Allowance:</label>
            <input
                type="number"
                value={payrollInfo.mealAllow ?? 0}
                onChange={(e) => checkNumberInput(e, setPayrollInfo, "mealAllow")}
                onBlur={(e) => handleBlur(e, setPayrollInfo, "mealAllow")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Birthday Bonus:</label>
            <input
                type="number"
                value={payrollInfo.bdayBonus ?? 0}
                onChange={(e) => checkNumberInput(e, setPayrollInfo, "bdayBonus")}
                onBlur={(e) => handleBlur(e, setPayrollInfo, "bdayBonus")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Incentive:</label>
            <input
                type="number"
                value={payrollInfo.incentive ?? 0}
                onChange={(e) => checkNumberInput(e, setPayrollInfo, "incentive")}
                onBlur={(e) => handleBlur(e, setPayrollInfo, "incentive")}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Others:</label>
            <input
                type="number"
                value={payrollInfo.otherPayrollInfo ?? 0}
                onChange={(e) => checkNumberInput(e, setPayrollInfo, "otherPayrollInfo")}
                onBlur={(e) => handleBlur(e, setPayrollInfo, "otherPayrollInfo")}
            />
        </div>
    </div>
);

export default PayrollInfo;
