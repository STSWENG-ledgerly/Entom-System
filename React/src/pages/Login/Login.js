import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123') {
      navigate('/MainMenu');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Enter password" 
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
