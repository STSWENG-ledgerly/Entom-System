import React, { createContext, useState, useEffect } from 'react';
export const BASE_URL = process.env.REACT_APP_BASE_URL;

// Context setup
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ rate: '', basic: '' });
  const [passwordHash, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
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
  }, []);

  useEffect(() => {
  fetch(`${BASE_URL}/getAdminAccount`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.username && data.password) {
        setUsername(data.username);
        setPassword(data.password); // This assumes your backend returns passwordHash as `password`
      } else {
        console.warn("No admin credentials returned from /getAdminAccount");
      }
    })
    .catch((err) => console.error("Error fetching admin credentials:", err));
  }, []);

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
      userPayroll, setUserPayroll, createUserPayment,
      getAllUserPayments, getUserPayment, saveUserPayment, deleteUserPayment,
      passwordHash, setPassword, username, setUsername
    }}>
      {children}
    </ConfigContext.Provider>
  );
};