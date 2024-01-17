// ProductDetails.jsx
import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
        name: "Fill Face Shuttering Plywood 32 Sq. Ft.: 18 mm",
        price: "6000",
        imageUrl: fillfaces,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      3: {
        name: "Cements",
        price: "150",
        imageUrl: jagadamba,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      4: {
        name: "Cements",
        price: "8000",
        imageUrl: square,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      5: {
        name: "Cements",
        price: "2000",
        imageUrl: mspipe,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      6: {
        name: "Cements",
        price: "2600",
        imageUrl: angle,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      7: {
        name: "Cements",
        price: "2304",
        imageUrl: cgi,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },

      8: {
        name: "Cements",
        price: "1330",
        imageUrl: bento,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      9: {
        name: "Cements",
        price: "1500",
        imageUrl: props,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
      },
      10: {
        name: "Cements",
        price: "200",
        imageUrl: fontite,
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
