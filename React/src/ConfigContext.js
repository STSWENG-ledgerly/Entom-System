
import { createContext, useEffect, useState } from 'react';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

// Context setup
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ rate: '', basic: '' });
  const [passwordHash, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
  if (!selectedEmployeeId) {
    // fallback to default config if no employee selected
    fetch(`${BASE_URL}/getConfig`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setConfig({ rate: data[0].rate, basic: data[0].basic });
        } else {
          console.warn("No config data found from /getConfig");
        }
      })
      .catch((err) => console.error("Error fetching config:", err));
    return;
  }

  fetch(`${BASE_URL}/getEmployeeDetails/${selectedEmployeeId}`)
    .then(res => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data) {
        setConfig({
        rate:  data.overtimeRate ?? 0,
        basic: data.basicSalary  ?? 0
        });
      }
    })
    .catch(err => {
      console.error("Error fetching employee config:", err.message);
    });
}, [selectedEmployeeId]);
  

  //payroll configs
  const [userPayroll, setUserPayroll] = useState({
    payrollInfo: {
      date: '',
      ot: 0,
      salaryIncrease: 0,
      mealAllow: 0,
      bdayBonus: 0,
      incentive: 0,
      otherPayrollInfo: 0,
    },
    deductions: {
      sss: 0,
      philhealth: 0,
      pagibig: 0,
      cashAdvance: 0,
      healthCard: 0,
      absences: 0,
      otherDeductions: 0,
    },
  });

  const createUserPayment = (userId, paymentData) => {
    const userPayments = userPayroll[userId] || [];
    const paymentId = Date.now(); //payment id is timestamp to make it unique
    const newPayment = { paymentId, ...paymentData };
    setUserPayroll((payroll) => ({
      ...payroll,
      [userId]: [...userPayments, newPayment]
    }));
    console.log("Created new Payment", userId, paymentId, newPayment); //for debugging
  };

  // get all payments
  const getAllUserPayments = (userId) => userPayroll[userId] || [];

  //get user payment by ids
  const getUserPayment = (userId, paymentId) => {
    const userPayments = getAllUserPayments(userId);
    console.log("All payments of", paymentId, userPayments);
    const pay = userPayments.find(payment => { return payment.paymentId === paymentId; }) || null;
    console.log("Found Payment:", pay);  //for debugging
    return pay;
  };

  const saveUserPayment = (userId, paymentId, newData) => {
    setUserPayroll((payroll) => ({
      ...payroll,
      [userId]: payroll[userId].map((payment) =>
        payment.paymentId === paymentId ? { ...payment, ...newData } : payment
      ),
    }));
  };
  const deleteUserPayment = (userId, paymentId) => {
    setUserPayroll((payroll) => ({
      ...payroll,
      [userId]: payroll[userId].filter(payment => payment.paymentId !== paymentId)
    }));
    console.log("Deleted Payment", userId, paymentId);   //for debugging
  };



  return (
    <ConfigContext.Provider value={{
      config, setConfig,
       selectedEmployeeId, setSelectedEmployeeId,
      userPayroll, setUserPayroll, createUserPayment,
      getAllUserPayments, getUserPayment, saveUserPayment, deleteUserPayment,
      passwordHash, setPassword, username, setUsername
    }}>
      {children}
    </ConfigContext.Provider>
  );
};