import React from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); 
    };

    const handleMenu= () => {
        navigate('/MainMenu');
    };

    return (
      <div>
        <button onClick={handleMenu}> Menu </button> <br></br>
        <button onClick={handleBack}> Back </button> <br></br>
      </div>
    );
  };
  
export default Header;