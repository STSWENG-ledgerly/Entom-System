import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../_header/Header';

const GeneratePayroll = () => {
    const { id, fname, lname } = useParams();  // params passed from previous pages

    // TODO - Audrey
    return (
      <div>
        <h1>Generate Payroll for {fname} {lname}</h1>
        <Header></Header>
      </div>
    );
  };
  
export default GeneratePayroll;