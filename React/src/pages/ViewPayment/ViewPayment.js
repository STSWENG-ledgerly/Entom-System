import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../_header/Header';


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
      <div>
        <h1>Payroll History of {fname} {lname}</h1>
        <Header></Header>
        <td><button onClick={() => handleEdit(1)}>Edit</button></td>
        <td><button onClick={() => handleDelete(1)}>Delete</button></td>

      </div>
    );
  };
  
export default ViewPayment;