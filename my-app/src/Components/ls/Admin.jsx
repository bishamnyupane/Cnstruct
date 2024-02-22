import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Ad from "../ls/ad";
import './Admin.css';
import axios from 'axios';

const Admin = () => {
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

  const [product, setProduct] = useState({ id: undefined, name: '', category: '', price: '', description: '', imageFile: null });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setProduct({...product, imageFile: files[0]});
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = async () => {
    // if (!product.id || !product.name || !product.price || !product.description || !product.imageFile) {
    //     alert('Please fill out all the   fields before adding the product.');
    //     return;
    // }
    const productToAdd = { ...newProduct };
    setAddedProducts([...addedProducts, productToAdd]);
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      imageFile: null,
    });
    try {
        const response = await axios.post('http://localhost:3001/item', {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description
    });
    console.log("item insertion request response:", response);
    window.location.href="/home";
    } catch(error){
        console.log("error inserting item :", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    const updatedProducts = addedProducts.filter(
      (product) => product.id !== id
    );
    setAddedProducts(updatedProducts);
    try {
        const response = await axios.delete(`http://localhost:3001/item/${product.id}`);
    console.log("item deletion request response:", response);
    window.location.href="/home";
    } catch(error){
        return console.log("error inserting item :", error);
    }
  };

  const handleEditProduct = (id) => {
    // Set the editing product id to enable editing mode
    setEditingProductId(id);
    // Populate the input fields with the product's information
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
  }

  const handleUpdateProduct = async () => {
    try {
        const response = await axios.put('http://localhost:3001/item', {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description
    });
    console.log("item insertion request response:", response);
    window.location.href="/home";
    } catch(error){
        console.log("error inserting item :", error);
    }
  };

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
        <h2 className="this">Add, Update and Delete Products</h2>
        <div className="input-field">
          <input
            type="numeric"
            name="id"
            placeholder="ID"
            value={product.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="input-field">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleInputChange}
             
          />
        </div>
        <br />
        <div className="input-field">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
             
          />
        </div>
        <br />
        <div className="input-field">
          <input
            type="textarea"
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleInputChange}
             
          />
        </div>
        <br />

        <div className="input-field">
          <input
            type="file"
            name="imageFile"
            onChange={handleInputChange}
             
          />
        </div>

        <br />
        <div className="buttonDiv">
        <button className="add-product-btn" onClick={ editingProductId ? handleSaveEdit : handleAddProduct}>
          <span>{'Add Product'}</span>
        </button>
        <button className="update-product-btn add-product-btn" onClick={handleUpdateProduct}>
          <span>{'Update Product'}</span>
        </button>
        <button className="update-product-btn add-product-btn" onClick={handleDeleteProduct}>
          <span>{'Delete Product'}</span>
        </button>
        </div>
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
              onDelete={() => handleDeleteProduct(product.id)} // Pass product id to handleDeleteProduct
              onEdit={() => handleEditProduct(product.id)} // Pass product id to handleEditProduct

           />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;