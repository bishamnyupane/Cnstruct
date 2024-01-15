// ProductDetails.jsx
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import cements from '../../assets/logo-black.png';
import './ProductDetails.css';

const ProductDetails = ({ onAddToCart }) => {
  // Get productId from URL params
  const { productId } = useParams();
  const navigate = useNavigate();

  // Simulate product details based on productId
  const productDetails = {
    1: {
      name: "Cements",
      price: "700",
      imageUrl: cements,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    2: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      3: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      4: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      5: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      6: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      7: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },

      8: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      9: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      10: {
        name: "Cements",
        price: "700",
        imageUrl: cements,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
    // Add details for other products if needed
  };

  // Check if the product exists
  if (!productDetails[productId]) {
    return <div>Product not found</div>;
  }

  const { name, price, imageUrl, description } = productDetails[productId];
  const handleAddToCartClick = () => {
    // Add the item to the cart by calling the provided onAddToCart function
    onAddToCart({ productId, name, price, imageUrl });
    navigate('/'); // Navigate back to home after adding to cart
  };

  return (
    <section id="prodetails" className="section-p1">
      <div className="single-pro-image">
        {/* Wrap the image with Link */}
        <Link to="/">
          <img src={imageUrl} width="100%" id="MainImg" alt={name} />
        </Link>
        {/* Other small images... */}
      </div>

      <div className="single-pro-details">
        <h6>{productId}</h6>
        <h4>{name}</h4>
        <h2>Rs.{price}</h2>
        <button className="normal" onClick={handleAddToCartClick}>Add To Cart</button>
        <h4>Product Details</h4>
        <span>{description}</span>

        {/* Link to go back to Home */}
        <Link to="/">Go Back</Link>
      </div>
    </section>
  );
};

export default ProductDetails;
