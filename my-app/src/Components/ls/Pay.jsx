// Pay.jsx

import React, { useState, useEffect } from "react";
import "./Pay.css";
import { useLocation } from "react-router-dom";
import qr from "../../assets/qr.png";
import Others from "./Others";
import axios from 'axios';

const Pay = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [district, setDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [ordersHistory, setOrdersHistory] = useState([]);

  useEffect(() => {
    if (location?.state?.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location?.state?.cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePaymentOptionChange = (e) => {
    setSelectedPaymentOption(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (
      firstName &&
      lastName &&
      stateVal &&
      district &&
      phoneNumber &&
      selectedPaymentOption
    ) {
      console.log("Order placed successfully!");
      console.log("Selected Payment Option:", selectedPaymentOption);

      if (
        selectedPaymentOption === "directBankTransfer" &&
        paymentScreenshot
      ) {
        console.log(
          "Direct Bank Transfer - Payment Screenshot:",
          paymentScreenshot
        );
      } else if (selectedPaymentOption === "onlinePayment") {
        console.log("Online Payment - Implement Khalti API integration.");
      }

      const newOrder = {
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        date: new Date(),
        total: calculateSubtotal()
      };

      handlePlaceOrderServerSide(newOrder);
      console.log(newOrder);
      
      setOrdersHistory([...ordersHistory, newOrder]);
      resetFormFields();
    } else {
      alert(
        "Please fill in all the required fields and select a payment option."
      );
    }
  };

  const handlePlaceOrderServerSide = async(newOrder) => {
    const currentUser = JSON.parse(localStorage.getItem("userObject"));
    try{
      const response = await axios.post('http://localhost:3001/order', {
        userId : currentUser.user.id,
        order: newOrder
      });
      console.log("order placement response:", response);
    } catch(err){
      console.log("error placing order:", err);
    }
  }

  const resetFormFields = () => {
    setFirstName("");
    setLastName("");
    setStateVal("");
    setDistrict("");
    setPhoneNumber("");
    setSelectedPaymentOption("");
    setPaymentScreenshot(null);
    setCartItems([]);
  };

  const handleChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setPaymentScreenshot(null);
  };

  const cancelOrderItem = (orderId, itemId) => {
  const updatedOrders = [...ordersHistory];
  updatedOrders[orderId].items.splice(itemId, 1); // Remove the item from the order
  setOrdersHistory(updatedOrders);
};

  return (
    <div>
      <div className="box1">
        <h2 className="ab">Payment Details</h2>
        <div>
          <h3 className="cd">Order Summary</h3>
          <table className="xy"></table>
          <p className="pq">Total Subtotal: Rs.{calculateSubtotal()}</p>
        </div>
      </div>

      <div className="input-forms">
        <h2 className="thiss">Personal Information</h2>
        <form>
          <div className="input-field">
            <label className="la" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label className="la" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label className="la" htmlFor="stateVal">
              State:
            </label>
            <input
              type="text"
              id="stateVal"
              value={stateVal}
              onChange={(e) => setStateVal(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label className="la" htmlFor="district">
              District:
            </label>
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label className="la" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </form>
      </div>

      <div className="box1">
        <h2 className="ef">Payment Options</h2>
        <div className="gh">
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="cashOnDelivery"
              onChange={handlePaymentOptionChange}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="directBankTransfer"
              onChange={handlePaymentOptionChange}
            />
            Direct Bank Transfer
          </label>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="onlinePayment"
              onChange={handlePaymentOptionChange}
            />
            Online Payment
          </label>
        </div>

        <div
          className="ij"
          id="directBankDetails"
          style={{
            display:
              selectedPaymentOption === "directBankTransfer" ? "block" : "none",
          }}
        >
          <p>Bank Details:</p>
          <p>Account Name: Cnstruct Store</p>
          <p>Account Number: 1234 5677 8912 4567</p>
          <img src={qr} alt="Bank Transfer QR Code" />
          <div className="file-upload">
            <p>Upload Payment Slip or Screenshot Below:</p>
            <label htmlFor="file-input" className="file-label">
              <span>Choose File</span>
            </label>
            <input
              type="file"
              id="file-input"
              accept="*/*"
              onChange={handleChange}
            />
            {paymentScreenshot && (
              <div className="uploaded-file">
                <span>File Uploaded: {paymentScreenshot.name}</span>
                <span className="remove-file" onClick={handleRemoveFile}>
                  ✖
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          className="kl"
          id="khaltiPaymentDetails"
          style={{
            display:
              selectedPaymentOption === "onlinePayment" ? "block" : "none",
          }}
        >
          <p>Online Payment - Khalti API details go here.</p>
        </div>
      </div>

      <button className="po" onClick={handlePlaceOrder}>
        Place Order
      </button>
      <Others ordersHistory={ordersHistory} cancelOrder={cancelOrderItem} />

    </div>
  );
};

export default Pay;