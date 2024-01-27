import React from 'react';
import './About.css';
import storeLogo from '../../assets/logo-no-background.png';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <img src={storeLogo} alt="Store Logo" className="store-logo" />

      <div className="about-us-content">
        <h2>Cnstrct - An Online Construction Store</h2>
        <p>
          Stands at the forefront of innovation in the construction sector, serving as the inaugural and largest e-commerce platform in Nepal.
          Business to Consumers (B2C) marketplaces, we are a comprehensive solution for all construction needs.From hardware and electrical to
          sanitary, plumbing, machinery, and building materials, we offer an extensive range of products under one digital roof.
        </p>

        <p>
          In a complex and diverse construction industry, we recognize the challenge of navigating through various brands, product categories, and price points.
          Cnstrct is dedicated to simplifying this process, ensuring that every customer receives the right product at the ideal cost and precisely when needed, whether for small or large-scale projects.
          Our commitment is to eliminate the waste of precious time caused by confusion in decision-making during construction works.
        </p>

        <p>
          Notably, our platform provides exclusive features tailored for B2C customers.
          These tools empower them to monitor the progress, expenses, and purchase details of individual construction sites, facilitating efficient project management.
          Our consistent pricing, whether for single or multiple purchases, enables business clients to acquire exactly what they need, contributing to the seamless management of their Cash Flow.
          At Cnstrct, we are not just an online store; we are your trusted partner in construction excellence.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
