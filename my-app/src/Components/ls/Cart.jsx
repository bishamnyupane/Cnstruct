import React, { useState } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { CiCircleRemove } from "react-icons/ci";

import cements from '../../assets/logo-black.png'; // Import your images

const Cart = ({}) => {
  const initialItems = [
    { id: 1, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 2, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 3, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 4, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 5, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 6, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 7, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 8, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 9, name: 'Cements', price: 600, quantity: 1, image: cements },
    { id: 10, name: 'Cements', price: 600, quantity: 1, image: cements },

    // Add more items as needed
  ];

  const [items, setItems] = useState(initialItems);

  const handleQuantityChange = (itemId, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <section className="cart-table-section">
        <table className="cart-table" width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <button onClick={() => handleRemoveItem(item.id)}>
                  <CiCircleRemove />
                    </button>
                </td>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                </td>
                <td>{item.name}</td>
                <td>Rs.{item.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                  />
                </td>
                <td>Rs.{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div className="subtotal-section" id="subtotal">
          <h3>Cart Total</h3>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td>Rs.{calculateSubtotal()}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>Rs.{calculateSubtotal()}</strong>
              </td>
            </tr>
          </table>
          <button className="normal">Proceed to checkout</button>
        </div>
      </section>
    </div>
  );
};

export default Cart;