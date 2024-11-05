import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

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
    <div className={styles.background}>
      <div className={styles.rect}>
        <text className={styles.prompt}>ENTER PASSWORD</text>
        <form className={styles.formSection}onSubmit={handleSubmit}>
          <input className={styles.passwordHolder}
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Admin Password" 
          /> <br></br>
          <button className={styles.submitButton} type="submit">LOGIN</button>
        </form>
      </div>
    </div>
    
  );
};

export default Login;
