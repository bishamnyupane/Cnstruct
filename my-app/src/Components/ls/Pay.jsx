import React, { useState, useEffect } from "react";
import "./Pay.css";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import qr from "../../assets/qr.png";

const Pay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [district, setDistrict] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

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

      if (selectedPaymentOption === "directBankTransfer" && paymentScreenshot) {
        console.log(
          "Direct Bank Transfer - Payment Screenshot:",
          paymentScreenshot
        );
      } else if (selectedPaymentOption === "onlinePayment") {
        console.log("Online Payment - Implement Khalti API integration.");
      }
      navigate("/orderconfirm");
    } else {
      alert(
        "Please fill in all the required fields and select a payment option."
      );
    }
  };

  const handleChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setPaymentScreenshot(null);
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

      <div className="box1">
        <h2>Personal Information</h2>
        <form>
          <table className="personal-info-table">
            <tbody>
              <tr>
                <td>
                  <label className="la" htmlFor="firstName">
                    First Name:
                  </label>
                </td>
                <td>
                  <input
                    type="text1"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="la" htmlFor="lastName">
                    Last Name:
                  </label>
                </td>
                <td>
                  <input
                    type="text1"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="la" htmlFor="stateVal">
                    State:
                  </label>
                </td>
                <td>
                  <input
                    type="text1"
                    id="stateVal"
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="la" htmlFor="district">
                    District:
                  </label>
                </td>
                <td>
                  <input
                    type="text1"
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="la" htmlFor="phoneNumber">
                    Phone Number:
                  </label>
                </td>
                <td>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
    </div>
  );
};

export default Pay;
