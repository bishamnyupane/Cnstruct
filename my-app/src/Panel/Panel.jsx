// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Panel.css';
// const Panel = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState('');
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:3001/products');
//       setProducts(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setLoading(false);
//     }
//   };

//   const handleAddProduct = async () => {
//     try {
//       await axios.post('http://localhost:3001/products', {
//         name,
//         price,
//         description,
//         image
//       });
//       setName('');
//       setPrice('');
//       setDescription('');
//       setImage('');
//       fetchProducts();
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:3001/products/${productId}`);
//       fetchProducts();
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Product</h2>
//       <div>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
//         <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//         <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
//         <button onClick={handleAddProduct}>Add Product</button>
//       </div>
//       <h2>Products</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>
//               <div>{product.name}</div>
//               <div>{product.price}</div>
//               <div>{product.description}</div>
//               <div>
//                 <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Panel;
