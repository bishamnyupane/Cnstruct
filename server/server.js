const express = require('express');
const path = require('path');
const config = require('config');
const mysql = require('mysql2');

//creating an instance of express and setting up a middleware to parse JSON in requests
const app = express();
// app.use(express.json());
app.listen(3000, () => console.log('server running on port 3000'));

//setting up server file to serve static content which will be generated from React app in production
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('my-app/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(___dirname, 'my-app', 'build', 'index.html'));
    });
}

//mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'test',
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


