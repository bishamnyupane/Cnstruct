// import React from 'react';
// import { BsFillBagHeartFill } from 'react-icons/bs';
// import { Link } from 'react-router-dom';
// const Card = ({ id, name, price, image, addToCart }) => {
  

//   return (

// <div className="card">
// <Link to={`/product/${id}?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`}>
//   <img src={image} alt={name} className="card-img" />
//   </Link>
//   <div className="card-details">
//     <h3 className="card-title">{name}</h3>
//     <section className="card-price">
//       <div className="price">Rs. {price}</div>

//     </section>
//   </div>
// <div className="bag">
// <button onClick={() => addToCart({ id, name, price, image })}>
//   <BsFillBagHeartFill />
// </button>
// </div>

// </div>
//   );
// };

// export default Card;


import React, { useState } from 'react';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Card = ({ id, name, price, image, addToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000); // Reset the state after 2 seconds
  };

  return (
    <div className="card">
      <Link to={`/product/${id}?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`}>
        <img src={image} alt={name} className="card-img" />
      </Link>
      <div className="card-details">
        <h3 className="card-title">{name}</h3>
    <h4 clasName="card-title">Category:{category}</h4>
    <h3 clasName="card-title">ID:{id}</h3>
        <section className="card-price">
          <div className="price">Rs. {price}</div>
        </section>
      </div>
      <div className="bag">
        <button onClick={handleAddToCart}>
          <BsFillBagHeartFill />
        </button>
      </div>
      {isAdded && <p className="added-message">Item added to cart!</p>}
    </div>
  );
};

export default Card;
