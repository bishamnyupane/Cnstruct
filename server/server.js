const express = require('express');
// const path = require('path');
const config = require('config');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

//creating an instance of express and setting up a middleware to parse JSON in requests
const app = express();
app.use(express.json());
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
    const { name, email, password, address, phone, dob } = req.body;

    if( !name || !email || !password || !address || !phone || !dob ){
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
        
                    connection.query("INSERT INTO users (fullName, email, password, address, phone, dob) VALUES (?, ?, ?, ?, ?, ?)", [name, email, hash, address, phone, dob], (err, results, fields) => {
                            if(err){
                                console.log("error while inserting user", err);
                                return res.status(400).send();
                            }

                            jwt.sign(
                                { email: email },
                                config.get('jwtsecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err){
                                        console.log("error generating jwt", err);
                                    }
                                    return res.json({
                                        token,
                                        customer: {
                                            name: name,
                                            email: email
                                        }
                                    });
                                }
                            );
        

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
            if(!isMatch) return res.status(400).json({msg:'Invalid credentials'});

            jwt.sign(
                { email: user.email },
                config.get('jwtsecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            name: user.fullName,
                            email: user.email
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
            res.json(user);
        }]
    )

})

//reading all users from the db
app.get("/read", async (req, res) => {
    try{
        connection.query("SELECT * FROM users", (err, results, fields) => {
            if(err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results);
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

//reading specific users from the db
app.get("/read/single", async(req, res) => {
    const email = req.body.email;

    try{
        connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results, fields) => {
            if(err)
            {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results);
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

//updating a user
app.patch("/update", async (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.newPassword;

    try{
        connection.query(
            "UPDATE users SET password = ? WHERE email = ?", [newPassword, email], (err, results, fields) => {
                if(err){
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json({message: 'user password updated successfully.'});
            }
        );
    }
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

//delete a user
app.delete("/delete", async (req, res) => {
    const email = req.body.email;

    try{
        connection.query(
            "DELETE FROM users WHERE email = ?", [email], (err, results, fields) => {
                if(err){
                    console.log(err);
                    return res.status(400).send();
                }
                if(results.affectedRows == 0) {
                    return res.status(404).json({message: 'no user with that email.'});
                }
                return res.status(200).json({message: 'user delete successfully.'});                
            }
        );
    }
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

