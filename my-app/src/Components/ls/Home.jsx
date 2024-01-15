// Home.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cements from '../../assets/logo-black.png';
import { AiFillStar } from 'react-icons/ai';
import { BsFillBagHeartFill } from 'react-icons/bs';
import  Cart from './Cart';
import './Home.css';

const Card = ({ productId, name, price, imageUrl,onAddToCart }) => {
  
  return (
    <Link to={`/product/${productId}`} className="card">
      <img src={imageUrl} alt={name} className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{name}</h3>
        <section className="card-price">
          <div className="price" >
           {/* <del>Rs.900</del> */}
           Rs. {price}
          </div>
          <div className="bag">
            {/* Call onAddToCart when bag is clicked */}
            <button onClick={() => onAddToCart({ productId, name, price, imageUrl })}>
              <BsFillBagHeartFill />
              </button>
          </div>
        </section>
      </div>
      
    </Link>
  );
};
const Home = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);

  // Function to add items to the cart
  const handleAddToCart = (item) => {
    console.log(item);
    setCartItems((prevItems) => [...prevItems, item]);
  };

  if (location.pathname === '/product/:productId') {
    return null; // Don't render anything if ProductDetails is displayed
  }

  return (
    <div>
      <section className="card-container">
        {/* Card 1 */}
        <Card productId="1" name="Cements" price="700" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="2" name="Cement" price="200" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="3" name="Cemen" price="300" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="4" name="Ceme" price="400" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="5" name="Cem" price="500" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="6" name="Ce" price="600" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="7" name="C" price="800" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="8" name="Shavels" price="900" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="9" name="Shavel" price="1000" imageUrl={cements} onAddToCart={handleAddToCart} />
        <Card productId="10" name="Shave" price="1200" imageUrl={cements} onAddToCart={handleAddToCart} />

        {/* Repeat similar sections for other cards */}
      </section>
      {cartItems.length > 0 && (
        <div className="cart-button">
          <Link to="/cart">View Cart ({cartItems.length})</Link>
    </div>
      )}
      </div>
  );
};

export default Home;