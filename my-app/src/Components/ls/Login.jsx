import React, { useState ,useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import Cookies from 'js-cookie'
import axios from 'axios';
import  {jwtDecode} from 'jwt-decode';

const Login = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); // Import useNavigate
  const LoginResponse =useState("string");
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = async (event) => {
    event.preventDefault()

    // Validate if the email ends with "ncit.edu.np"
    const isGmail = /@ncit.edu\.np$/.test(email);

    if (!isGmail) {
      setEmailError('Please enter a valid college email');
      return
    }
    if(!password.trim()){
      setPasswordError('Please enter your password');
      return;
    }

    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/Login', {
        emailID: email,
        password: password,
      })

      localStorage.setItem('token', response.data.token)

      navigate('/dashboard')


    } catch (error) {
      console.error(error)
    }

  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  },[navigate])
  

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
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
          />
          {emailError && <div className="email-error">{emailError}</div>}
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input
            type={showPassword ? 'text' : 'password'}
            className="password-input-box"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
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
        <Link to="/Signup" className='submit gray' onClick={() => onToggle('Signup')}>
          Sign Up
        </Link>
        <Link to="/Login" className='submit' onClick={() => onToggle('Login')}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Login;
