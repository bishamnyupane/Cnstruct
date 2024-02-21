import React, { useState, useEffect } from 'react';
import './Home.css';
import Card from './Card';
import axios from 'axios';
const Home = ({ addToCart }) => {
  
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

  {items.map(item => (
    <Card key={item.id} id={item.id} name={item.name} category={item.category} price={item.price} image={images.find(img => img.id === item.id)?.imgFile || ''} addToCart={addToCart}/>
    )
  )
}   
    </div>
     );
    };

export default Home;
