const express = require('express');
const path = require('path');
const config = require('config');
const mysql = require('mysql2');

//creating an instance of express and setting up a middleware to parse JSON in requests
const app = express();
app.use(express.json());
app.listen(3001, () => console.log('server running on port 3000'));

//setting up server file to serve static content which will be generated from React app in production
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.resolve(__dirname, 'my-app', 'build')));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(___dirname, 'my-app', 'build', 'index.html'));
    });
}

//mysql connection
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

module.exports = connection;
/*

//creating the post route
app.post("/create", async (req, res) => {
    //destructuring
    const {name, email, password} = req.body;

    try{
        connection.query(
            "INSERT INTO users (full_name, email, user_password) VALUES (?, ?, ?)",
            [name, email, password],
            (err, results, field) => {
                if(err)
                {
                    console.log("error while inserting a user into the database", err);
                    return res.status(400).send();

                }
                return res
                .status(201)
                .json({messsage:"new user created successfully."});
            }
        );
    }
    catch(err){
        console.log(err);
        return res.status(500).send();
    }
});

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
app.get("/read/single/:email", async(req, res) => {
    const email = req.params.email;

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
app.patch("/update/:email", async (req, res) => {
    const email = req.params.email;
    const newPassword = req.body.newPassword;

    try{
        connection.query(
            "UPDATE users SET user_password = ? WHERE email = ?", [newPassword, email], (err, results, fields) => {
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
app.delete("/delete/:email", async (req, res) => {
    const email = req.params.email;

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


*/