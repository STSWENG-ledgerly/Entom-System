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
        console.log('pain');
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
            <label htmlFor="sss">SSS:</label>
            <input
                id="sss"
                type="number" value={deductions.sss}
                onChange={(e) => checkNumberInput(e, setDeductions, "sss")}
                onBlur={(e) => handleBlur(e, setDeductions, "sss")}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="philhealth">Philhealth:</label>
            <input
                id="philhealth"
                type="number" value={deductions.philhealth}
                onChange={(e) => checkNumberInput(e, setDeductions, "philhealth")}
                onBlur={(e) => handleBlur(e, setDeductions, "philhealth")}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="pagibig">PAG-IBIG:</label>
            <input
                id="pagibig"
                type="number" value={deductions.pagibig}
                onChange={(e) => checkNumberInput(e, setDeductions, "pagibig")}
                onBlur={(e) => handleBlur(e, setDeductions, "pagibig")}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="cashAdvance">Cash Advance:</label>
            <input
                id="cashAdvance"
                type="number" value={deductions.cashAdvance}
                onChange={(e) => checkNumberInput(e, setDeductions, "cashAdvance")}
                onBlur={(e) => handleBlur(e, setDeductions, "cashAdvance")}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="healthCard">Health Card:</label>
            <input
                id="healthCard"
                type="number" value={deductions.healthCard}
                onChange={(e) => checkNumberInput(e, setDeductions, "healthCard")}
                onBlur={(e) => handleBlur(e, setDeductions, "healthCard")}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="absences">Late/Absent:</label>
            <input
                id="absences"
                type="number" value={deductions.absences}
                onChange={(e) => checkNumberInput(e, setDeductions, "absences")}
                onBlur={(e) => handleBlur(e, setDeductions, "absences")}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="otherDeductions">Others:</label>
            <input
                id="otherDeductions"
                type="number" value={deductions.otherDeductions}
                onChange={(e) => checkNumberInput(e, setDeductions, "otherDeductions")}
                onBlur={(e) => handleBlur(e, setDeductions, "otherDeductions")}
            />
        </div>
    </div>
);

export default DeductionsInfo;