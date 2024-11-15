import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import Header from '../_header/Header';
import global from '../../global.module.css'
import styles from './SearchEmployee.module.css';

const SearchEmployee = () => {
    const navigate = useNavigate();
    const { searchType } = useParams(); 
    const title = (searchType === 'ViewPayrollHistory' ? 'View Payroll History of an Employee' : 'Calculate Payroll for an Employee');
    const buttonText = (searchType === 'ViewPayrollHistory' ? 'View' : 'Calculate');
    const [searchID, setSearchID] = useState('');
    const [searchFName, setSearchFName] = useState('');
    const [searchLName, setSearchLName] = useState('');
    
    // temporary, can add/remove attributes shown based on employee SQL table (phone, position, etc)
    const employees = [
      { id: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com' },
      { id: 2, fname: 'Iker', lname: 'Ventura', email: 'iventura@gmail.com' },
      { id: 3, fname: 'Zora', lname: 'Scott', email: 'zscott@gmail.com' },
      { id: 4, fname: 'Alice', lname: 'Johnson', email: 'ajohnson@gmail.com' },
      { id: 5, fname: 'Bob', lname: 'Smith', email: 'bsmith@gmail.com' },
      { id: 6, fname: 'Charlie', lname: 'Brown', email: 'cbrown@gmail.com' },
      { id: 7, fname: 'David', lname: 'Wilson', email: 'dwilson@gmail.com' },
      { id: 8, fname: 'Eva', lname: 'Martinez', email: 'emartinez@gmail.com' },
      { id: 9, fname: 'Frank', lname: 'Garcia', email: 'fgarcia@gmail.com' },
      { id: 10, fname: 'Grace', lname: 'Lee', email: 'glee@gmail.com' },
      { id: 11, fname: 'Hannah', lname: 'Walker', email: 'hwalker@gmail.com' },
      { id: 12, fname: 'Ian', lname: 'Hall', email: 'ihall@gmail.com' },
      { id: 13, fname: 'Jack', lname: 'Young', email: 'jyoung@gmail.com' },
      { id: 14, fname: 'Karen', lname: 'King', email: 'kking@gmail.com' },
      { id: 15, fname: 'Liam', lname: 'Wright', email: 'lwright@gmail.com' }
  ];

    const [filteredEmployees, setFilteredEmployees] = useState(employees);

    const handleSearchID = (e) => {
      setSearchID(e.target.value);
    };

    const handleSearchFName = (e) => {
      setSearchFName(e.target.value);
    };

    const handleSearchLName = (e) => {
      setSearchLName(e.target.value);
    };

    const handleButton = (id, fname, lname) => {
        searchType === 'ViewPayrollHistory' ? navigate(`../ViewPayment/${id}/${fname}/${lname}`) : navigate(`../GeneratePayroll/${id}/${fname}/${lname}`);
    };

    const handleSearchButtonID = () => {
      const filtered = searchID
        ? employees.filter(employee => employee.id.toString() === searchID)
        : employees;
  
      setFilteredEmployees(filtered);
    };

    const handleSearchButtonFName = () => {
      const filtered = searchFName
        ? employees.filter(employee => employee.fname.toLowerCase().includes(searchFName.toLowerCase()))
        : employees;
  
      setFilteredEmployees(filtered);
    };

    const handleSearchButtonLName = () => {
      const filtered = searchLName
        ? employees.filter(employee => employee.lname.toLowerCase().includes(searchLName.toLowerCase()))
        : employees;
  
      setFilteredEmployees(filtered);
    };
    
    // Note: change to SQL implementation later
    return (
      <div className={global.wrapper}>
        <Sidebar></Sidebar>
      <div>
        <Header></Header>

      <div className={global.mainContent}>
      <h1><span className={global.title}>{title}</span></h1>

    <div className = {styles.searchBox}>
      <div className = {styles.searchContainer}>
        <input
        type="text"
        value={ searchID }
        onChange={ handleSearchID }
        ></input>
        <button onClick={ handleSearchButtonID }>Search by ID</button>
      </div>

      <div className = {styles.searchContainer}>
        <input
        type="text"
        value={ searchFName }
        onChange={ handleSearchFName }
        ></input>
        <button onClick={ handleSearchButtonFName }>Search by First Name</button>
      </div>

      <div className = {styles.searchContainer}>
        <input
        type="text"
        value={ searchLName }
        onChange={ handleSearchLName }
        ></input>
        <button onClick={ handleSearchButtonLName }>Search by Last Name</button>
      </div>
    </div>
    
    <div className = {styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.fname}</td>
            <td>{employee.lname}</td>
            <td>{employee.email}</td>
            <td><button className = {styles.actionButton} onClick={() => handleButton(employee.id, employee.fname, employee.lname)}>{buttonText}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
      </div>
      </div>
    );
  };
  
export default SearchEmployee;