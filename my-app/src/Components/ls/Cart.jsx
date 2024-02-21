import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiCircleRemove } from 'react-icons/ci';
import './Cart.css';
import axios from 'axios';

const currentUser = JSON.parse(localStorage.getItem("userObject"));

  const Cart = ({ cartItems , setCartItems}) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/cart/${currentUser.user.id}`).then((response) => {
      const cartData = response.data;
      console.log("fetched cart items:", response.data);
      const newCartItems = cartData.map(item => ({ id: item.productId, name: item.name, price: item.price, image:`http://localhost:3001/productImages/${item.productId}.png`, quantity: item.quantity }));
      setCartItems(newCartItems);
    }).catch( (err) => {
      console.log("error loading user cart items:", err);
  });
  }, [setCartItems]);

    const handleQuantityChange = (itemId, newQuantity) => {
      newQuantity = Math.max(0, newQuantity);
      const updatedCart = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item));
      setCartItems(updatedCart);
    handleQuantityChangeServerSide(itemId, newQuantity);
    };

    const handleQuantityChangeServerSide = async(itemId, newQuantity) => {
      try{
        const response = await axios.post('http://localhost:3001/cart', {
          userId : currentUser.user.id,
          productId : itemId,
          quantity : newQuantity
        });
        console.log("update quantity response:", response);
      } catch(err){
        console.log("error updating cart item quantity:", err);
      }
    }

    const handleRemoveItem = (itemId) => {
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      handleRemoveItemServerSide(itemId);
    };

    const handleRemoveItemServerSide = async(itemId) => {
      try{
        const response = await axios.delete('http://localhost:3001/cart', { data: {
          userId : currentUser.user.id ,
          productId : itemId
        } });
        console.log("cart item removal request response:", response);
      } catch(err){
        console.log("error removing item from cart:", err);
      }
    }


  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const handleProceedToCheckout = () => {
    // Navigate to Pay component with cart items
    navigate('/pay', { state: { cartItems } });
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
          <button className="normal" onClick={handleProceedToCheckout}>Proceed to checkout</button>
        </div>
      </section>
    </div>
  );
}

export default Cart;


