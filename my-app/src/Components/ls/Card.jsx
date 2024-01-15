import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillBagHeartFill } from 'react-icons/bs';

const Card = ({ productId, name, price, imageUrl, onAddToCarts }) => {
  const handleAddToCart = () => {
    onAddToCarts({ productId, name, price, imageUrl });

  }

  return (
    <div className="card">
      <Link to={`/product/${productId}`} className="card-link">
        <img src={imageUrl} alt={name} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{name}</h3>
          <section className="card-price">
            <div className="price">Rs. {price}</div>
          </section>
        </div>
      </Link>
      <div className="bag">
      <button onClick={handleAddToCart}>
        <BsFillBagHeartFill />
      </button>
      </div>
      </div>
  );
};

export default Card;
