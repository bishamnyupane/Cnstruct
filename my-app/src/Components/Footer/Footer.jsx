import React, { useState } from 'react';
import './Footer.css';
import Pay from '../ls/Pay';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";


const Footer = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (window.scrollY > 400) {
          setShowScroll(true);
        } else {
          setShowScroll(false);
        }
      };
      

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: cnstrct2024@gmail.com</p>
          <p>Phone: +977 9897342343</p>
          <p>Address:Balkumari-16,Lalitpur </p>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <Link to="/home">Home</Link>
          {/* <Link to="/shop">Shop</Link> */}
          <Link to="/about">About</Link>
          <Link to="/cart">Cart</Link>

          <div className="checkout-button">
        <button className="normal" onClick={() => window.location.href = '/pay'}>Order and Payment</button>
      </div>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/ourncit" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cnstrct- An Online Construction Store. All rights reserved.</p>
        {showScroll && (
          <button className="scroll-to-top-btn" onClick={scrollToTop}>
            &#8593;
          </button>
        )}

      </div>
    </footer>
  );
};

export default Footer;
