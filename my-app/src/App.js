import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/ls/Login';
import Signup from './Components/ls/Signup';
import Home from './Components/ls/Home';
import Cart from './Components/ls/Cart';
import Card from './Components/ls/Card';
import ProductDetails from './Components/ls/ProductDetails';
import { BrowserRouter as Router, Routes, Route,Link ,useNavigate} from 'react-router-dom';

function App() {
  const [currentOption, setCurrentOption] = useState('Login');
  const handleToggleOption = (option) => {
    setCurrentOption(option);
  };

  const [cartItems, setCartItems] = useState([]);

  // Function to add items to the cart
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <Router>
      <div>
        <Navbar />
        {/* <Home/> */}
        {/* {currentOption === 'Login' && <Login onToggle={handleToggleOption} />} */}
        {currentOption === 'Signup' && <Signup onToggle={handleToggleOption} />}

        <Routes>
          <Route path='/Home' element={<Home onAddToCarts={handleAddToCart}/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Cart" element={<Cart/>}/>

          <Route path="/" element={<Home onAddToCarts={handleAddToCart} />} />
          <Route path="/Cart" element={<Cart cartItems={cartItems} />} />
          
          <Route path="/product/:productId" element={<ProductDetails onAddToCarts={handleAddToCart} />} />
        </Routes>
        </div>
    </Router>
  );
}

export default App;
