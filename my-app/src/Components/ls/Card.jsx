import React from 'react';
import { BsFillBagHeartFill } from 'react-icons/bs';

const Card = ({ id, name, price, image, addToCart }) => {
  

  return (

<div className="card">
  <img src={image} alt={name} className="card-img" />
  <div className="card-details">
    <h3 className="card-title">{name}</h3>
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
