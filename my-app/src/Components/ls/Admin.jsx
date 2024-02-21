

import React, { useState } from "react";
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { List } from "react-virtualized";
import Ad from "../ls/ad";
import "./Admin.css";

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [addedProducts, setAddedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    imageFile: null,
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = () => {
    if (
      !newProduct.id ||
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.imageFile
    ) {
      alert(
        "Please fill out all the required fields before adding the product."
      );

      return;
    }
    const productToAdd = { ...newProduct };
    setAddedProducts([...addedProducts, productToAdd]);
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      imageFile: null,
    });
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = addedProducts.filter(
      (product) => product.id !== id
    );
    setAddedProducts(updatedProducts);
  };

  const handleEditProduct = (id) => {
    setEditingProductId(id);
    const productToEdit = addedProducts.find((product) => product.id === id);
    setNewProduct({ ...productToEdit });
  };

  const handleSaveEdit = () => {
    const editingProductIndex = addedProducts.findIndex(
      (product) => product.id === editingProductId
    );
    const updatedProducts = [...addedProducts];
    updatedProducts[editingProductIndex] = { ...newProduct };
    setAddedProducts(updatedProducts);
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      imageFile: null,
    });
    setEditingProductId(null);
  };

  if (location.pathname === "/product/:productId") {
    return null;
  }

  const handleViewOrders = () => {
    
    navigate('/order'); 
  };

  return (
    <div className="admin-wrapper">
      <div className="order">
        <button className="orders-btn" onClick={handleViewOrders}>
          Orders
        </button>
      </div>
      <div className="input-form">
        <h2 className="this">Update and Delete Products</h2>
        <div className="input-field">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={newProduct.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div class="input-field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        <div class="input-field">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        <div className="input-field">
          <input
            type="textarea"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />

        <div class="input-field">
          <input
            type="file"
            name="imageFile"
            onChange={handleInputChange}
            required
          />
        </div>

        <br />
        <button
          className="add-product-btn"
          onClick={editingProductId ? handleSaveEdit : handleAddProduct}
        >
          <span>{editingProductId ? "Save Edit" : "Add Product"}</span>
        </button>
      </div>

      <br />
      <hr />
      <h2 className="this">Added Product Preview</h2>

      <div className="card-container">
        {addedProducts.map((product, index) => (
          <div key={product.id} className="product-card">
            <Ad
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={URL.createObjectURL(product.imageFile)}
              onDelete={() => handleDeleteProduct(product.id)} 
              onEdit={() => handleEditProduct(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
