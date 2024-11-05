import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import Header from '../_header/Header';
import global from '../../global.module.css'

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
        { id: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com'},
        { id: 2, fname: 'Iker', lname: 'Ventura', email: 'iventura@gmail.com' },
        { id: 3, fname: 'Zora', lname: 'Scott', email: 'zscott@gmail.com'},
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

      <div>
        <input
        type="text"
        placeholder="Enter Employee ID"
        value={ searchID }
        onChange={ handleSearchID }
        ></input>
        <button onClick={ handleSearchButtonID }>Search by ID</button>
      </div>

      <div>
        <input
        type="text"
        placeholder="Enter Employee's First Name"
        value={ searchFName }
        onChange={ handleSearchFName }
        ></input>
        <button onClick={ handleSearchButtonFName }>Search by First Name</button>
      </div>

      <div>
        <input
        type="text"
        placeholder="Enter Employee's Last Name"
        value={ searchLName }
        onChange={ handleSearchLName }
        ></input>
        <button onClick={ handleSearchButtonLName }>Search by Last Name</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.fname}</td>
            <td>{employee.lname}</td>
            <td>{employee.email}</td>
            <td><button onClick={() => handleButton(employee.id, employee.fname, employee.lname)}>{buttonText}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      </div>
      </div>
    );
  };
  
export default SearchEmployee;