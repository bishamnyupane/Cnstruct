import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillBagHeartFill } from 'react-icons/bs';
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
import Card from './Card';
import axios from 'axios';
const Home = ({ addToCart }) => {
  const [category, setCategory] = useState('all');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time as needed

    // Clean up timer
    return () => clearTimeout(timer);
  }, []);
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
        axios.get('http://localhost:3001/item').then((response) => {
          setItems(response.data);
          console.log("fetched items:", response.data);

          setImages([]);

          response.data.forEach(item => {
            axios.get( `http://localhost:3001/productImages/${item.id}.png`, { responseType: 'blob'} )
            .then((response) => {
              setImages(prevImages => [...prevImages, { id: item.id, imgFile: URL.createObjectURL(response.data) }]);
            })
            .catch(err => console.log("error fetching images:", err));
          });
          }).catch(err => console.log("error fetching items in home page:", err));
  }, []);

  return (
    <div className="app">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
      <div className="category-selector">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="a">Category A</option>
          <option value="b">Category B</option>
          <option value="c">Category C</option>
          <option value="d">Category D</option>
          <option value="e">Category E</option>
          <option value="f">Category F</option>
          <option value="g">Category G</option>
        </select>
      </div>

      {(category === 'a' || category === 'all') && (
        <>
          <Card id={1} name="Cements" price={700} image={cements} addToCart={addToCart} />
          <Card id={2} name="Fill Face Shuttering Plywood 32 Sq. Ft.: 18 mm" price={6000} image={fillfaces} addToCart={addToCart} />
          <Card id={3} name="Jagdamba: TMT Thermex Steel Bar 12MM" price="150" image={jagadamba} addToCart={addToCart} />
        </>
      )}

      {(category === 'b' || category === 'all') && (
        <>
          <Card id={4} name="Square Steel Pipe 20 Ft: 4" price="8000" image={square} addToCart={addToCart} />
          <Card id={5} name="MS Pipe 1.5X20 " price="2000" image={mspipe} addToCart={addToCart} />
        </>
      )}

      {(category === 'c' || category === 'all') && (
        <>
          <Card id={6} name="Angle 50X50X5inches" price="2600" image={angle} addToCart={addToCart} />
          <Card id={7} name="CGI Sheets (Jasta) 0.35 mm Plain 12 ft." price="2304" image={cgi} addToCart={addToCart} />
        </>
      )}

      {(category === 'd' || category === 'all') && (
        <>
          <Card id={8} name="Bentonite Powder: 40KG" price="1330" image={bento} addToCart={addToCart} />
          <Card id={9} name="Construction Props: 11 Ft" price="1500" image={props} addToCart={addToCart} />
          <Card id={10} name="Fomtite (Tierod)" price="200" image={fontite} addToCart={addToCart} />
        </>
      )}
        </>
      )}
    </div>
  );
};

export default Home;
