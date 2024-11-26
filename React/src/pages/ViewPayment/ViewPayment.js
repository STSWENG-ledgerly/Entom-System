import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../_sidebar/Sidebar';
import Header from '../_header/Header';
import global from '../../global.module.css';
import { ConfigContext } from '../../ConfigContext';

const ViewPayment = () => {
  const navigate = useNavigate();
  const { id, fname, lname } = useParams();  // params passed from previous pages
  const { getAllUserPayments, deleteUserPayment } = useContext(ConfigContext);
  const userPayments = getAllUserPayments(id);

  const handleEdit = (payment_id) => {
    navigate(`../EditPayroll/${id}/${payment_id}/${fname}/${lname}`);
  };

  const handleDelete = (payment_id) => {
    deleteUserPayment(id, payment_id);
  };

  return (
    <div className={global.wrapper}>
      <Sidebar></Sidebar>
      <div>
        <Header></Header>

        <div className={global.mainContent}>
          <h1><span className={global.title}>Payroll History of {fname} {lname}</span></h1>

          {
            //added payments here for navigation to edit payroll 
          }
          {userPayments.map((payment) => (
            <span key={payment.paymentId}>
              <span>{payment.paymentId}</span>
              <span>
                <button onClick={() => handleEdit(payment.paymentId)}>Edit</button>
                <button onClick={() => handleDelete(payment.paymentId)}>Delete</button>
              </span>
            </span>
          ))}

          {/*
          <td><button onClick={() => handleEdit(1)}>Edit</button></td>
          <td><button onClick={() => handleDelete(1)}>Delete</button></td>*/
          }
        </div>

      </div>
    </div>
  );
};

export default ViewPayment;