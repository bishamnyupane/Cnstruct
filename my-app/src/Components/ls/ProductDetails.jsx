import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

// Import images
import cements from '../../assets/cements.png';
import angle from '../../assets/angle.png';
import bento from '../../assets/bento.png';
import cgi from '../../assets/cgi.png';
import fontite from '../../assets/fontite.png';
import jagadamba from '../../assets/jagadamba.png';
import mspipe from '../../assets/mspipe.png';
import propsImage from '../../assets/props.png';
import square from '../../assets/squre.png';
import fillfaces from '../../assets/fillfaces.png';

const ProductDetails = () => {
  const { productId } = useParams();
  

  const productDetails = {
    1: {
      name: "Cements",
      price: "700",
      imageUrl: cements,
      description: "It is typically composed of finely ground clinker, mixed with gypsum and other additives ,creating a paste that hardens over time to provide strength and durability to various structures",
    },
    2: {
      name: "Fill Face Shuttering Plywood 32 Sq. Ft.: 18 mm",
      price: "6000",
      imageUrl: fillfaces,
      description: "The Fill Face Shuttering Plywood, measuring 32 sq. ft. and 18 mm in thickness, is a robust and durable material specifically designed for use in construction shuttering applications. With its sturdy 18 mm thickness, it provides stability and support, making it ideal for creating formwork in concrete structures during the construction process....",
    },
    3: {
      name: "Jagdamba: TMT Thermex Steel Bar 12MM",
      price: "150",
      imageUrl: jagadamba,
      description: "Jagdamba's TMT Thermex Steel Bar with a diameter of 12mm is a high-quality construction material known for its strength and resilience. Engineered through advanced Thermex technology, it ensures superior toughness and corrosion resistance, making it a reliable choice for reinforcing concrete structures.",
    },
    4: {
      name: "Square Steel Pipe 20 Ft: 4",
      price: "8000",
      imageUrl: square,
      description: " A 20-foot square steel pipe, quantity of 4, is a versatile and durable construction material suitable for various structural applications.",
    },
    5: {
      name: "MS Pipe 1.5X20",
      price: "2000",
      imageUrl: mspipe,
      description: "This Mild Steel (MS) pipe with dimensions 1.5 inches in diameter and 20 feet in length is commonly used in construction for its strength and adaptability.",
    },
    6: {
      name: "Angle 50X50X5inches",
      price: "2600",
      imageUrl: angle,
      description: "The 50x50x5 inches steel angle is a sturdy structural component widely used in construction for providing support and reinforcement to various building elements. ",
    },
    7: {
      name: "CGI Sheets (Jasta) 0.35 mm Plain 12 ft.",
      price: "2304",
      imageUrl: cgi,
      description: " Jasta CGI sheets, 0.35 mm thick and 12 feet in length, are plain galvanized iron sheets suitable for roofing and cladding applications, offering durability and weather resistance",
    },
    8: {
      name: "Bentonite Powder: 40KG",
      price: "1330",
      imageUrl: bento,
      description: "Bentonite powder, weighing 40 kilograms, is utilized in construction for its unique swelling and sealing properties, commonly used in foundation and drilling applications.",
    },
    9: {
      name: "Construction Props: 11 Ft",
      price: "1500",
      imageUrl: propsImage,
      description: " 11 Ft - Construction props, with a height of 11 feet, are adjustable support tools used to temporarily support structures during construction, providing stability and safety",
    },
    10: {
      name: "Fomtite (Tierod)",
      price: "200",
      imageUrl: fontite,
      description: "  Fomtite tierods are construction components used for anchoring and securing formwork in concrete structures, ensuring stability and integrity during the construction process.",
    },
  };

  if (!productDetails[productId]) {
    return <div>Product not found</div>;
  }

  const { name, price, imageUrl, description } = productDetails[productId];

  return (
    <section id="prodetails" className="section-p1">
      <div className="single-pro-image">
        <img src={imageUrl} width="100%" id="MainImg" alt={name} />
      </div>

      <div className="single-pro-details">
        <h1>{name}</h1>
        <h2>Rs.{price}</h2>
        {/* <h4>Product Details</h4> */}
        <span>{description}</span>

        <Link to="/">Go Back</Link>
      </div>
    </section>
  );
};

export default ProductDetails;

