import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import TempHeader from '../_header/TempHeader';
import global from '../../global.module.css';


const ViewPayment = () => {
    const navigate = useNavigate();
    const { id, fname, lname } = useParams();  // params passed from previous pages

    const handleEdit = (payment_id) => {
        navigate(`../EditPayroll/${payment_id}/${fname}/${lname}`);
    };

    const handleDelete = (payment_id) => {
        // TODO - Audrey
    };

    // TODO - Brian, pass each payment_id to respective buttons
    return (
      <div className={global.wrapper}>
        <Sidebar></Sidebar>
        <div>
        <TempHeader></TempHeader>

        <div className={global.mainContent}>
        <h1><span className={global.title}>Payroll History of {fname} {lname}</span></h1>
        <td><button onClick={() => handleEdit(1)}>Edit</button></td>
        <td><button onClick={() => handleDelete(1)}>Delete</button></td>
        </div>

        </div>
      </div>
    );
  };
  
export default ViewPayment;