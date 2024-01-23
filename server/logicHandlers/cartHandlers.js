const { json } = require('express');
const connection = require('../server');

//fetch all items in the cart for displaying in the frontend

module.exports.getCartItems = async (req, res) => {
    const userId = req.params.id;
    try{
        connection.query("SELECT productId, quantity, name, price FROM cart INNER JOIN product ON cart.productId = product.id WHERE userId = ?", [userId], (err, results, fields) => {
            if(err) throw err;

            //if a cart exists for the user and cart is non-empty then return the cart, else return null

            if(results.length>0){
                res.send(results);
            }
            else{
                res.send(null);
            }
        });
    } catch(err){
        console.log(err);
        res.status(500).send("something went wrong");
    }
}

module.exports.addCartItem = async (req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    try{
        connection.query("SELECT * FROM product WHERE id = ?", [productId], (err, results, fields) => {
            if(err) throw err;
            if(results.length == 0){
                return res.status(404).send('Item not found.');
            }
            connection.query("SELECT * FROM cart WHERE userId = ?", [userId], (err, results, fields) => {
                if(err) throw err;

                    const foundProduct = results.find(obj => obj.productId === productId);

                    //if product is already present in cart
                    if(foundProduct){
                        connection.query("UPDATE cart SET quantity = quantity + ? WHERE productId = ? AND userId = ?", [quantity, productId, userId], (err, results, fields) => {
                            if(err) throw err;
                            connection.query("SELECT productId, quantity, name, price FROM cart INNER JOIN product ON cart.productId = product.id WHERE userId = ?", [  userId, productId], (err, results, fields) => {
                                if(err) throw err;
                                return res.status(201).send(results);
                            });
                        });
                    }

                    //if product isnt already present in cart
                    else{
                        connection.query("INSERT INTO cart VALUES (?, ?, ?)", [userId, productId, quantity], (err, results, fields) => {
                            if(err) throw err;
                            connection.query("SELECT productId, quantity, name, price FROM cart INNER JOIN product ON cart.productId = product.id WHERE userId = ?", [  userId], (err, results, fields) => {
                                if(err) throw err;
                                return res.status(201).send(results);
                            });
                        });
                    }

                
            })
        })
    } catch(err){
        console.log(err);
        res.status(500).send("something went wrong");
    }
}

module.exports.deleteItem = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try{
        connection.query("SELECT * FROM cart WHERE userId = ? AND productId = ?", [userId, productId], (err, results, field) => {
            if(err) throw err;
            if(results.length == 0){
                return res.status(400).send("invalid deletion, specified item doesn't exist");
            }
            connection.query("DELETE FROM cart WHERE userId = ? AND productId = ?", [userId, productId], (err, results, fields) => {
                if(err) throw err;
                connection.query("SELECT productId, quantity, name, price FROM cart INNER JOIN product ON cart.productId = product.id WHERE userId = ? ", [  userId], (err, results, fields) => {
                    if(err) throw err;
                    return res.status(201).send(results);
                });
            });
        })
    } catch (err) {
        console.log(err);
        res.status(500).send("something went wrong");
    }
}