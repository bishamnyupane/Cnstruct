const express = require('express');
// const path = require('path');
const config = require('config');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const cors = require('cors');
const multer = require('multer');

const corsOptions = {
    origin: ['http://localhost:3000', "http://localhost:3001"],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
};

//creating an instance of express and setting up a middleware to parse JSON in requests
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'productImages/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('myImage'), (req, res) => {
    try {
        res.send({ message: "File uploaded successfully." });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.use(express.json());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//making images available
app.use('/productImages', express.static('productImages'));

app.listen(3001, () => console.log('server running on port 3001'));

const connection = mysql.createConnection({
    host: '172.19.64.1',
    database: 'cnstrct',
    user: 'root',
    password: 'root123'
});

//connecting to the database using the above credentials
connection.connect((err) => {
    if(err) {
        console.log("Error connecting to MySQL database:", err);
        return;
    }
    console.log("MySQL successfully connected");
})

//register
app.post("/register", async (req, res) => {
    //destructuring
    const { name, email, password, address, phone } = req.body;

    if( !name || !email || !password || !address || !phone ){
        return res.status(400).json({msg: "Please enter all fields"});
    }

    try{
        connection.query(
            "SELECT * FROM users WHERE email = ?", [email], (err, results, field) => {
                if(err)
                {
                    console.log(err);
                    return res.status(400).send();
                }
             if(results.length > 0){
                return res.status(400).json({msg: 'user already exists'});
             }

             bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err){
                         console.log("error occurred during password hashing:", err);
                         return;
                    }
        
                    connection.query("INSERT INTO users (fullName, email, password, address, phone) VALUES (?, ?, ?, ?, ?)", [name, email, hash, address, phone], (err, results, fields) => {
                            if(err){
                                console.log("error while inserting user", err);
                                return res.status(400).send();
                            }
                            return res.status(201).send("user created successfully");
                        })                    
                });
            });
            }
        );
    } catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

//login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password) {
        return res.status(400).json({msg: "please enter all the fields"});
    }

    connection.query(
        "SELECT * FROM users WHERE email = ?", [email], (err, results, field) => {
            if(err)
            {
                console.log(err);
                return res.status(400).send();
            }
         if(results.length == 0){
            return res.status(400).json({msg: 'user does not exist'});
         }

         const user = results[0];

         //validate password
         bcrypt.compare(password, user.password)
         .then(isMatch => {
            if(!isMatch)
            {
                 return res.status(401).json({msg:'Invalid credentials'});
            }
            jwt.sign(
                { email: user.email },user.admin ? config.get('jwtAdminSecret') :
                config.get('jwtUserSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    return res.json({
                        token,
                        user: {
                            name: user.fullName,
                            email: user.email,
                            admin: user.admin
                        }
                    });
                }
            )
         })
        }
    );
} )

//route to check if a user is logged in
app.get('/user', auth, (req, res) => {
    
    connection.query(
        "SELECT * FROM users WHERE id=?", [req.user.id, (err, results, fields) => {
            if(err) throw err;
            const user = results[0];
            delete user.password;
            return res.json(user);
        }]
    )

})

//auth handlers and routes completed

//cart handlers and routes:

//fetch all items in the cart of a user
app.get('/cart', async (req, res) => {
    const userId = req.body.id;
    try{
        connection.query("SELECT productId, quantity, name, price FROM cart INNER JOIN product ON cart.productId = product.id WHERE userId = ?", [userId], (err, results, fields) => {
            if(err){
                console.log("error while fetching cart:", err);
                throw err;
            }

            //if a cart exists for the user and cart is non-empty then return the cart, else return null

            if(results.length>0){
                return res.send(results);
            }
            else{
                return res.send(null);
            }
        });
    } catch(err){
        console.log(err);
        return res.status(500).send("something went wrong");
    }
} )

//add item to cart
app.post('/cart', async (req, res) => {
    const userId = req.body.id;
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
        return res.status(500).send("something went wrong");
    }
})

//delete item from cart
app.delete('/cart', async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;

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
        return res.status(500).send("something went wrong");
    }
})

//routes and handlers for cart completed

//routes and handlers for item

app.get('/item', async (req, res) => {
    connection.query(
        "SELECT * FROM product",
        (err, results, fields) => {
            if(err) throw err;
            return res.json(results);
        }
    );
})

app.post('/item', async (req, res) => {
    const { id, name, price, category, description } = req.body;
    connection.query(
        "INSERT INTO product (name, price, id, category, description) VALUES (?, ?, ?, ?, ?)", [name, price, id, category, description], (err, results, fields) => {
            if(err) {
                console.log("error while inserting item:", err);
                throw err;
            }
            return res.json({ name, price, id, category, description});
        }
    );
    
})

app.put('/item', (req, res) => {
    const { name, price, id, category, description} = req.body;
    connection.query(
        "UPDATE product SET name = ?, price = ?, category = ?, description = ? WHERE id = ? ", [name, price, category, description, id ], (err, results, fields) => {
            if(err) {
                console.log("error occurred while updating item:", err);
                throw err;
            }
            return res.json({ name, price, id, category, description});
        }
    );
})


app.delete('/item/:id', (req, res) => {
    const id = req.params.id;
    connection.query(
        "DELETE FROM product WHERE id = ?", [id], (err, results, fields) => {
            if(err){
                console.log("error while deleting item:", err);
                throw err;
            }
            return res.json({success: true});
        }
    );
})



//routes and handlers for item completed




//reading all users from the db
// app.get("/read", async (req, res) => {
//     try{
//         connection.query("SELECT * FROM users", (err, results, fields) => {
//             if(err) {
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             res.status(200).json(results);
//         });
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }
// });

// //reading specific users from the db
// app.get("/read/single", async(req, res) => {
//     const email = req.body.email;

//     try{
//         connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results, fields) => {
//             if(err)
//             {
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             res.status(200).json(results);
//         });
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }
// });

// //updating a user
// app.patch("/update", async (req, res) => {
//     const email = req.body.email;
//     const newPassword = req.body.newPassword;

//     try{
//         connection.query(
//             "UPDATE users SET password = ? WHERE email = ?", [newPassword, email], (err, results, fields) => {
//                 if(err){
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 return res.status(200).json({message: 'user password updated successfully.'});
//             }
//         );
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }
// });

// //delete a user
// app.delete("/delete", async (req, res) => {
//     const email = req.body.email;

//     try{
//         connection.query(
//             "DELETE FROM users WHERE email = ?", [email], (err, results, fields) => {
//                 if(err){
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 if(results.affectedRows == 0) {
//                     return res.status(404).json({message: 'no user with that email.'});
//                 }
//                 return res.status(200).json({message: 'user delete successfully.'});                
//             }
//         );
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send();
//     }
// });

