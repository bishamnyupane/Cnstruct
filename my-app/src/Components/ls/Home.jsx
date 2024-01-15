// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import cements from '../../assets/logo-black.png';
// import { AiFillStar } from 'react-icons/ai';
// import { BsFillBagHeartFill } from 'react-icons/bs';
// import  Cart from './Cart';
// import './Home.css';

// const Card = ({ productId, name, price, imageUrl,onAddToCarts }) => {
  
//   return (
//     <Link to={`/product/${productId}`} className="card">
//       <img src={imageUrl} alt={name} className="card-img" />
//       <div className="card-details">
//         <h3 className="card-title">{name}</h3>
//         <section className="card-price">
//           <div className="price" >
//            Rs. {price}
//           </div>
//           <div className="bag">
//             <button onClick={() => onAddToCarts({ productId, name, price, imageUrl })}>
//               <BsFillBagHeartFill />
//               </button>
//           </div>
//         </section>
//       </div>
      
//     </Link>
//   );
// };
// const Home = () => {
//   const location = useLocation();
//   const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = (item) => {
//     console.log(item);
//     setCartItems((prevItems) => [...prevItems, item]);
//   };

//   if (location.pathname === '/product/:productId') {
//     return null; }

//   return (
//     <div>
//       <section className="card-container">
//         {/* Card 1 */}
//         <Card productId="1" name="Cements" price="700" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="2" name="Cement" price="200" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="3" name="Cemen" price="300" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="4" name="Ceme" price="400" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="5" name="Cem" price="500" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="6" name="Ce" price="600" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="7" name="C" price="800" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="8" name="Shavels" price="900" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="9" name="Shavel" price="1000" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="10" name="Shave" price="1200" imageUrl={cements} onAddToCarts={handleAddToCart} />

//       </section>
//       {cartItems.length > 0 && (
//         <div className="cart-button">
//           <Link to="/cart">View Cart ({cartItems.length})</Link>
//     </div>
//       )}
//       </div>

          

//   );
// };






// // export default Home;
// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import cements from '../../assets/cements.png';
// import angle from '../../assets/angle.png';
// import bento from '../../assets/bento.png';
// import cgi from '../../assets/cgi.png';
// import fontite from '../../assets/fontite.png';
// import jagadamba from '../../assets/jagadamba.png';
// import mspipe from '../../assets/mspipe.png';
// import props from '../../assets/props.png';
// import square from '../../assets/squre.png';
// import fillfaces from '../../assets/fillfaces.png';

// import { BsFillBagHeartFill } from 'react-icons/bs';
// import Cart from './Cart';
// import './Home.css';

// const Card = ({ productId, name, price, imageUrl, onAddToCarts }) => {
//   const handleAddToCart = () => {
//     onAddToCarts({ productId, name, price, imageUrl });
//   };

  
//   return (
//     <div className="card">
//       <Link to={`/product/${productId}`} className="card-link">
//         <img src={imageUrl} alt={name} className="card-img" />
//         <div className="card-details">
//           <h3 className="card-title">{name}</h3>
//           <section className="card-price">
//             <div className="price">Rs. {price}</div>
//             <div className="bag">
//             <button onClick={handleAddToCart}>
//                 <BsFillBagHeartFill />
//               </button >
//             </div>
//           </section>
//         </div>
//       </Link>
//     </div>
//   );

//   }
// const Home = ({ onAddToCarts }) => {
//   const location = useLocation();
//   const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = (item) => {
//     setCartItems((prevItems) => [...prevItems, item]);
//   };

//   if (location.pathname === '/product/:productId') {
//     return null;
//   }

//   return (
//     <div>
//       <section className="card-container">
//         <Card productId="1" name="Cements" price="700" imageUrl={cements} onAddToCarts={handleAddToCart} />
//         <Card productId="2" name="Fill Face Shuttering Plywood 32 Sq. Ft.: 18 mm" price="Rs.6000" imageUrl={fillfaces} onAddToCarts={handleAddToCart} />
//         <Card productId="3" name="Jagdamba: TMT Thermex Steel Bar 12MM" price="150" imageUrl={jagadamba} onAddToCarts={handleAddToCart} />
//         <Card productId="4" name="Square Steel Pipe 20 Ft: 4" price="8000" imageUrl={square} onAddToCarts={handleAddToCart} />
//         <Card productId="5" name="MS Pipe 1.5X20 " price="2000" imageUrl={mspipe} onAddToCarts={handleAddToCart} />
//          <Card productId="6" name="Angle 50X50X5inches" price="2600" imageUrl={angle} onAddToCarts={handleAddToCart} />
//         <Card productId="7" name="CGI Sheets (Jasta) 0.35 mm Plain 12 ft." price="2304" imageUrl={cgi} onAddToCarts={handleAddToCart} />
//          <Card productId="8" name="Bentonite Powder: 40KG" price="1330" imageUrl={bento} onAddToCarts={handleAddToCart} />
//          <Card productId="9" name="Construction Props: 11 Ft" price="1500" imageUrl={props} onAddToCarts={handleAddToCart} />
//          <Card productId="10" name="Fomtite (Tierod)" price="200" imageUrl={fontite} onAddToCarts={handleAddToCart} />
//       </section>

//       {cartItems.length > 0 && (
//         <div className="cart-button">
//           <Link to="/cart">View Cart ({cartItems.length})</Link>
//         </div>
//       )}
//     </div>
//   );
// };


// export default Home;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsFillBagHeartFill } from 'react-icons/bs';
import cements from '../../assets/cements.png';
import angle from '../../assets/angle.png';
import bento from '../../assets/bento.png';
import cgi from '../../assets/cgi.png';
import fontite from '../../assets/fontite.png';
import jagadamba from '../../assets/jagadamba.png';
import mspipe from '../../assets/mspipe.png';
import props from '../../assets/props.png';
import square from '../../assets/squre.png';
import fillfaces from '../../assets/fillfaces.png';
import Card from './Card';
import './Home.css';

const Home = ({ onAddToCarts }) => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);

  // Function to add items to the cart
  const handleAddToCart = (item) => {
    // Update the cartItems state
    setCartItems((prevItems) => [...prevItems, item]);
  };

  if (location.pathname === '/product/:productId') {
    return null;
  }

  return (
    <div>
      <section className="card-container">
        {/* Card components */}
        <Card productId="1" name="Cements" price="700" imageUrl={cements} onAddToCarts={handleAddToCart} />
        <Card productId="2" name="Fill Face Shuttering Plywood 32 Sq. Ft.: 18 mm" price="Rs.6000" imageUrl={fillfaces} onAddToCarts={handleAddToCart} />
        <Card productId="3" name="Jagdamba: TMT Thermex Steel Bar 12MM" price="150" imageUrl={jagadamba} onAddToCarts={handleAddToCart} />
        <Card productId="4" name="Square Steel Pipe 20 Ft: 4" price="8000" imageUrl={square} onAddToCarts={handleAddToCart} />
        <Card productId="5" name="MS Pipe 1.5X20 " price="2000" imageUrl={mspipe} onAddToCarts={handleAddToCart} />
        <Card productId="6" name="Angle 50X50X5inches" price="2600" imageUrl={angle} onAddToCarts={handleAddToCart} />
        <Card productId="7" name="CGI Sheets (Jasta) 0.35 mm Plain 12 ft." price="2304" imageUrl={cgi} onAddToCarts={handleAddToCart} />
        <Card productId="8" name="Bentonite Powder: 40KG" price="1330" imageUrl={bento} onAddToCarts={handleAddToCart} />
        <Card productId="9" name="Construction Props: 11 Ft" price="1500" imageUrl={props} onAddToCarts={handleAddToCart} />
        <Card productId="10" name="Fomtite (Tierod)" price="200" imageUrl={fontite} onAddToCarts={handleAddToCart} />
        {/* Add other Card components similarly */}
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
