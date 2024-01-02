import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/ls/Login';
import Signup from './Components/ls/Signup';

function App() {
  const [currentOption, setCurrentOption] = useState('Login');
  const handleToggleOption = (option) => {
    setCurrentOption(option);
  };

  return (
    <div>
      <Navbar />
      {currentOption === 'Login' && <Login onToggle={handleToggleOption} />}
      {currentOption === 'Sign Up' && <Signup onToggle={handleToggleOption} />}
    </div>
  );
}

export default App;
