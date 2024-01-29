import React, { useState, useEffect } from 'react';
import './Home.css';
import Card from './Card';
import axios from 'axios';
const Home = ({ addToCart }) => {
  
  const [items, setItems] = useState([]);

  const imagePath = 'http://localhost:3001/productImages/';

  useEffect(() => {

      try{
        axios.get('http://localhost:3001/item').then((response) => {
          setItems(response.data);
          console.log("fetched items:", response.data);
        })
      } catch(err){
        return console.log("error fetching items in home page:", err);
      }
    
  }, []);

  return (

<div className="app">

  {items.map(item => (
    <Card key={item.id} id={item.id} name={item.name} category={item.category} price={item.price} image={imagePath+item.id+".png"} addToCart={addToCart}/>
    )
  )
}   
    </div>
     );
    };

export default Home;
