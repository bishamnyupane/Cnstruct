import React from 'react';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';


const Card = ({ id, name, price, image, addToCart, category }) => {
  

  return (

<div className="card">
<Link to={`/product/${id}?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`}>
  <img src={image} alt={name} className="card-img" />
  </Link>
  <div className="card-details">
    <h3 className="card-title">{name}</h3>
    <h6 >Category:{category}</h6>
    <h4 >ID:{id}</h4>
    <section className="card-price">
      <div className="price">Rs. {price}</div>

    </section>
  </div>
<div className="bag">
<button onClick={() => addToCart({ id, name, price, image })}>
  <BsFillBagHeartFill />
</button>
</div>
</div>
  );
};

export default Card;
