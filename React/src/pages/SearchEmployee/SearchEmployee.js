import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../_header/Header';

const SearchEmployee = () => {
    const navigate = useNavigate();
    const { searchType } = useParams(); 
    const title = (searchType === 'ViewPayrollHistory' ? 'View Payroll History of an Employee' : 'Calculate Payroll for an Employee');
    const buttonText = (searchType === 'ViewPayrollHistory' ? 'View' : 'Calculate');

    const handleButton = (id, fname, lname) => {
        searchType === 'ViewPayrollHistory' ? navigate(`../ViewPayment/${id}/${fname}/${lname}`) : navigate(`../GeneratePayroll/${id}/${fname}/${lname}`);
    };
    
    // temporary, can add/remove attributes shown based on employee SQL table (phone, position, etc)
    const employees = [
        { id: 1, fname: 'John', lname: 'Doe', email: 'jdoe@gmail.com'},
        { id: 2, fname: 'Iker', lname: 'Ventura', email: 'iventura@gmail.com' },
        { id: 3, fname: 'Zora', lname: 'Scott', email: 'zscott@gmail.com'},
      ];

    // TODO - Diego
    return (
      <div>
        <h1>{title}</h1>
        <Header></Header>

        <table>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            {employees.map(employee => (
            <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.fname}</td>
                <td>{employee.lname}</td>
                <td>{employee.email}</td>
                <td><button onClick={() => handleButton(employee.id, employee.fname, employee.lname)}>{buttonText}</button></td>
            </tr>
        ))}
        </table>
      </div>
    );
  };
  
export default SearchEmployee;