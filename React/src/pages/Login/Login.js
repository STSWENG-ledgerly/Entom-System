import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { ConfigContext } from '../../ConfigContext';
import officeImage from '../Login/office.jpg';


const Login = () => {
  const [userName, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();


  const { password } = useContext(ConfigContext);
  const { username } = useContext(ConfigContext);



  useEffect(() => {
    sessionStorage.removeItem('userValid');
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userPassword === password & userName === username) {
      sessionStorage.setItem('userValid', true);
      navigate('/MainMenu');
    } else {
      if (userPassword !== password) {
        setErrMessage("Password is incorrect");
      }
      if (userName !== username) {
        setErrMessage("Username not found");
      }
    }
  };


  return (
    <div className={styles.background}>
      <div className={styles.rect}>
        <div className={styles.leftrect}>
          <img src={officeImage} alt='bruh'></img>
        </div>
        <div className={styles.rightrect}>
          <text className={styles.prompt}>Login to your system</text>
          <form className={styles.formSection} onSubmit={handleSubmit}>
            <input className={styles.usernameHolder}
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input className={styles.passwordHolder}
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Admin Password"
            />
            <span className={styles.errMessage}>{errMessage}</span><br></br>
            <button className={styles.submitButton} type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;