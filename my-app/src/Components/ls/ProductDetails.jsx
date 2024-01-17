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
  const navigate = useNavigate();
  

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
      name: "Jagdamba: TMT Thermex Steel Bar 12MM",
      price: "150",
      imageUrl: jagadamba,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    4: {
      name: "Square Steel Pipe 20 Ft: 4",
      price: "8000",
      imageUrl: square,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    5: {
      name: "MS Pipe 1.5X20",
      price: "2000",
      imageUrl: mspipe,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    6: {
      name: "Angle 50X50X5inches",
      price: "2600",
      imageUrl: angle,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    7: {
      name: "CGI Sheets (Jasta) 0.35 mm Plain 12 ft.",
      price: "2304",
      imageUrl: cgi,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    8: {
      name: "Bentonite Powder: 40KG",
      price: "1330",
      imageUrl: bento,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    9: {
      name: "Construction Props: 11 Ft",
      price: "1500",
      imageUrl: propsImage,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
    },
    10: {
      name: "Fomtite (Tierod)",
      price: "200",
      imageUrl: fontite,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde nisi vitae asperiores et mollitia saepe...",
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
        <h4>Product Details</h4>
        <span>{description}</span>

        <Link to="/">Go Back</Link>
      </div>
    </section>
  );
};

export default ProductDetails;


// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import './ProductDetails.css';

// const ProductDetails = () => {
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const name = params.get('name');
//   const price = params.get('price');
//   const navigate = useNavigate();

//   if (!name || !price) {
//     navigate('/');
//     return null;
//   }

//   return (
//     <section id="prodetails" className="section-p1">
//       <div className="single-pro-details">
//         <h4>{name}</h4>
//         <h2>Rs.{price}</h2>

//         <Link to="/">Go Back</Link>
//       </div>
//     </section>
//   );
// };

// export default ProductDetails;

// ProductDetails.jsx

