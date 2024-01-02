import React from 'react';
import './Login.css';

import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';

const Login = ({ onToggle }) => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input placeholder='Email ID' type='email' />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input placeholder='Password' type='password' />
        </div>
      </div>
      <div className='forget-password'>
        Forget Password?<span>Click Here!</span>
      </div>
      <div className='submit-container'>
        <div className='submit gray' onClick={() => onToggle('Sign Up')}>
          Sign Up
        </div>
        <div className='submit' onClick={() => onToggle('Login')}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
