import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Ad from '../ls/ad';
import './Admin.css';
// import axios from 'axios';

const Admin = () => {
  const location = useLocation();
  const [addedProducts, setAddedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: '', name: '', price: '', description: '', imageFile: null });
  const [editingProductId, setEditingProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.name || !newProduct.price || !newProduct.description || !newProduct.imageFile) {
        alert('Please fill out all the required fields before adding the product.');

        return;

    }
    const productToAdd = { ...newProduct };
    setAddedProducts([...addedProducts, productToAdd]);
    setNewProduct({ id: '', name: '', price: '', description: '', imageFile: null });

  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = addedProducts.filter(product => product.id !== id);
    setAddedProducts(updatedProducts);
  };

  const handleEditProduct = (id) => {
    // Set the editing product id to enable editing mode
    setEditingProductId(id);
    // Find the product to edit based on its id
    const productToEdit = addedProducts.find(product => product.id === id);
    // Populate the input fields with the product's information
    setNewProduct({ ...productToEdit });
  };

  const handleSaveEdit = () => {
    // Find the index of the editing product
    const editingProductIndex = addedProducts.findIndex(product => product.id === editingProductId);
    // Create a copy of the products array
    const updatedProducts = [...addedProducts];
    // Update the product at the editing index
    updatedProducts[editingProductIndex] = { ...newProduct };
    // Update the state with the updated products array
    setAddedProducts(updatedProducts);
    // Reset the newProduct and editingProductId state
    setNewProduct({ id: '', name: '', price: '', description: '', imageFile: null });
    setEditingProductId(null);
  };

  if (location.pathname === '/product/:productId') {
    return null;
  }




  return (
    <div className="admin-wrapper">
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
        <button className="add-product-btn" onClick={editingProductId ? handleSaveEdit : handleAddProduct}>
          <span>{editingProductId ? 'Save Edit' : 'Add Product'}</span>
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