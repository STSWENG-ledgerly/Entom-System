import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import global from '../../global.module.css';
import Header from '../_header/Header';
import styles from './AddEmployee.module.css';
import { BASE_URL } from '../../ConfigContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';



const AddEmployee = () => {
  const handleExit = () => {
    sessionStorage.removeItem('userValid');
  };

  //constants for personal info
  const [fName, setFName] = useState('');
  const [middleName, setMName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');


  //constants for company infoasa
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [designation, setDesignation] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [dateHired, setDateHired] = useState('');
  //for the bankAccount object
  const [bankAccount, setBankAccount] = useState({
    bankName: '',
    accountNumber: '',
    branch: ''
  });

  // enter personal info
  const handleFName = (e) => {
    setFName(e.target.value);
  };
  const handleMName = (e) => {
    setMName(e.target.value);
  };
  const handleLName = (e) => {
    setLName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // enter company info
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };
  const handlePosition = (e) => {
    setPosition(e.target.value);
  };
  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  }
  const handleBasicSalary = (e) => {
    setBasicSalary(e.target.value);
  };
  const handleDateHired = (e) => {
    setDateHired(e.target.value);
  }
  //enter bank info
  const handleBankAccount = (e) => {

    const { name, value } = e.target;

    setBankAccount(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handeAddEmployeeButton = async () => {

    const employeeData = {
      employee_id: `EMP${Date.now()}`,
      company: "Chase",
      fname: fName,
      middleName,
      lname: lName,
      department,
      position,
      designation,
      basicSalary: Number(basicSalary),
      dateHired,
      phone,
      email,
      rbacProfile: 1,
      bankAccount: {
        bankName: bankAccount.bankName,
        accountNumber: bankAccount.accountNumber,
        branch: bankAccount.branch
      }
    };

    try {
      const response = await fetch(`${BASE_URL}/addEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Employee has been added!");
      }
      else {
        alert("Failed to add employee: ${result.error");
      }
    } catch (error) {
      console.error("Error adding employee: ", error);
      alert("Error in adding employee");
    }

  }
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  const title = "Add Employee";

  return (
    <div className={global.wrapper}>
      <Sidebar></Sidebar>
      <div>
        <Header></Header>
        <div className={global.mainContent}>
          <h1><span className={global.title}>{title}</span></h1>
          <div className={styles.infoContainer}>
            <div className={styles.searchBox}>
              <h3>Employee Personal Info</h3>
              <div className={styles.searchContainer}>

                <input
                  type="text"
                  placeholder="Enter employee's first name"
                  value={fName}
                  onChange={handleFName}
                ></input>
                <input
                  type="text"
                  placeholder="Enter emmployee's middle name"
                  value={middleName}
                  onChange={handleMName}
                ></input>
                <input
                  type="text"
                  placeholder="Enter employee's last name"
                  value={lName}
                  onChange={handleLName}
                ></input>
                <input
                  type="tel"
                  placeholder="Enter employee's phone number"
                  value={phone}
                  onChange={handlePhone}
                ></input>
                <input
                  type="email"
                  placeholder="Enter employee's email address"
                  value={email}
                  onChange={handleEmail}
                ></input>
              </div>
              <div>{fName}</div>
            </div>
            <div className={styles.searchBox}>
              <h3>Employee Company Info</h3>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  placeholder="Enter employee's hiring date"
                  value={dateHired}
                  onChange={handleDateHired}
                ></input>
                <input
                  type="text"
                  placeholder="Enter employee's department"
                  value={department}
                  onChange={handleDepartment}
                ></input>
                <input
                  type="text"
                  placeholder="Enter employee's position"
                  value={position}
                  onChange={handlePosition}
                ></input>
                <input
                  type="text"
                  placeholder="Enter employee's designation"
                  value={designation}
                  onChange={handleDesignation}
                ></input>
                <input
                  type="number"
                  placeholder="Enter employee's basic salary"
                  value={basicSalary}
                  onChange={handleBasicSalary}
                ></input>

              </div>
            </div>
            <div className={styles.searchBox}>
              <h3>Employee Bank Info</h3>
              <div className={styles.searchContainer}>
                <input
                  name="bankName"
                  type="text"
                  placeholder="Enter employee's bank"
                  value={bankAccount.bankName}
                  onChange={handleBankAccount}
                ></input>
                <input
                  name="accountNumber"
                  type="number"
                  placeholder="Enter employee's bank account number"
                  value={bankAccount.accountNumber}
                  onChange={handleBankAccount}
                ></input>
                <input
                  name="branch"
                  type="text"
                  placeholder="Enter employee's bank branch"
                  value={bankAccount.branch}
                  onChange={handleBankAccount}
                ></input>
              </div>
            </div>
          </div>
          <button className={styles.buttonDesign} onClick={handeAddEmployeeButton}>Add Employee</button>

        </div>
      </div>
    </div>



  );
};
export default AddEmployee;
