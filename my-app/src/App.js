import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/ls/Login';
import Signup from './Components/ls/Signup';
import Home from './Components/ls/Home';
import Cart from './Components/ls/Cart';
import About from './Components/ls/About';
// import Shop from './Components/ls/Shop';
import Card from './Components/ls/Card';
import Pay from './Components/ls/Pay';
import ProductDetails from './Components/ls/ProductDetails';
import { BrowserRouter as Router, Routes, Route,Link ,useNavigate} from 'react-router-dom';
import Footer from './Components/Footer/Footer';
function App() {

  const [currentOption, setCurrentOption] = useState('Login');
  const handleToggleOption = (option) => {
    setCurrentOption(option);
  };


  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...product, quantity: 1 }]);
    }
  };
 

  return (
    <Router>
      <div>
        <Navbar />
        {currentOption === 'Signup' && <Signup onToggle={handleToggleOption} />}
        <Routes>
        <Route path="/Home" element={<Home addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/About" element={<About/>} />
          {/* <Route path="/Shop" element={<Shop/>} /> */}


          <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/Pay" Component={Pay}/>
          <Route path="/product/:productId" element={<ProductDetails onAddToCart={addToCart} />} />
          <Route path="/" element={<Home addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />} />   

        </Routes>
        <Footer/>
        </div>
    </Router>
  );
}
export default App;