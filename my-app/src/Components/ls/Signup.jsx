import React from 'react';
import './Signup.css';

import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';

const Signup = ({ onToggle }) => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt='' />
          <input placeholder='Full Name' type='text' />
        </div>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input placeholder='Email ID' type='email' />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input placeholder='Password' type='password' />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input placeholder='Birthday Date' type='date' />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input placeholder='Mobile Number' type='tel' />
        </div>
      </div>
      <div className='submit-container'>
        <div className='submit' onClick={() => onToggle('Sign Up')}>
          Sign Up
        </div>
        <div className='submit gray' onClick={() => onToggle('Login')}>
          Login
        </div>
      </div>
      <div className='social-login'>
        <div className='social-button facebook'>Facebook</div>
        <div className='social-button google'>Google</div>
      </div>
      <div className='verification-code'>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input placeholder='Verification Code' type='text' />
        </div>
        <div className='submit'>Verify</div>
      </div>
    </div>
  );
};

export default Signup;
