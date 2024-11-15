import React from 'react';
import styles from './PayrollInfo.module.css'

const PayrollInfo = ({ payrollInfo, setPayrollInfo }) => (
    <div className={styles.formSection}>
        <div className={styles.formGroup}>
            <label>Date:</label>
            <input
                type="date" value={payrollInfo.date}
                onChange={(e) => setPayrollInfo({ ...payrollInfo, date: e.target.value })}
            />
        </div>
        <div className={styles.formGroup}>
            <label>Overtime (in Days):</label>
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
            <label>Meal Allowance:</label>
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
);

export default PayrollInfo;