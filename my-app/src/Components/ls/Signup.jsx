import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const Signup = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    dob: "",
  });

  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );
      console.log(response);

      window.location.href = "/login";
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        setApiError(
          error.response.data.msg || "An error occurred during registration."
        );
      } else if (error.request) {
        console.error("No response received from the server:", error.request);
        setApiError("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
        setApiError("Error setting up the request.");
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            placeholder="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            placeholder="Email ID"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            placeholder="Mobile Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
      {apiError && <div className="api-error">{apiError}</div>}
      <div className="submit-container">
        <div className="submit" onClick={handleSignup}>
          Signup
        </div>
      </div>
    </div>
  );
};

export default Signup;
