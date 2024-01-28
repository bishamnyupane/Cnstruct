import React, { useState ,useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import axios from 'axios';

const Login = ({ onToggle }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const navigate = useNavigate(); // Import useNavigate
;


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onEmailChange = (e) => { 
    setEmail(e.target.value); 
    setEmailError(''); 
  }

  const onPasswordChange = (e) => { 
    setPassword(e.target.value); 
    setPasswordError('');
   }

  const handleLoginClick = async () => {

    if(!email && !password){
      setEmailError("Please provide an email");
      setPasswordError("Please provide a password");
      return;
    }
    else if(!password){
      setPasswordError("Please provide a password");
      return;
    }
    else if(!email){
      setEmailError("Please provide an email");
      return;
    }

    // let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(email)){
      setEmailError("Please provide a valid email");
      return;
    }

    // if(!passwordRegex.test(password)){
    //   setPasswordError("At Least: 8 Characters, 1 Uppercase, 1 Lowercase, 1 Digit, 1 Special Character.");
    //   return;

  try{
    axios.post('http://localhost:3001/login', {
      email: email,
      password: password
    }).then( (response) => {
      if(response.data.token) {
        localStorage.setItem('userObject', JSON.stringify(response.data));
      }
    }).then( () => {
      navigate("/home");
      window.location.reload();
    })
  } catch(err){
    console.error("error making a post request:", err);
  }
  }

  return (


    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input
            type="text"
            className="username-input-box"
            value={email}
            onChange = {onEmailChange}
          />
          {emailError && <div className="email-error">{emailError}</div>}
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input
            type={showPassword ? 'text' : 'password'}
            className="password-input-box"
            value={password}
            onChange = {onPasswordChange}
          />
          <div className="toggle-password" onClick={handleTogglePassword}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </div>
          {passwordError && <div className="password-error">{passwordError}</div>}
        </div>
      </div>
      <div className='forget-password'>
        Forget Password?<span>Click Here!</span>
      </div>
      <div className='submit-container'>  
        <Link to="/Login" className='submit' onClick={handleLoginClick}>

          Login
        </Link>
      </div>
    </div>
  
  );
};

export default Login;
