import React from 'react';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { CiCircleRemove } from 'react-icons/ci';
import './Cart.css';

  const Cart = ({ cartItems , setCartItems}) => {
    
    const handleQuantityChange = (itemId, newQuantity) => {
      newQuantity = Math.max(0, newQuantity);
      const updatedCart = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item));
      setCartItems(updatedCart);
    
    };

    const handleRemoveItem = (itemId) => {
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
    };


  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
            {cartItems.map((item) => (
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
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
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
}

export default Cart;


