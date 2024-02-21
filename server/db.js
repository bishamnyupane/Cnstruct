const mysql = require('mysql');
const config = require('config');

const pool = mysql.createPool({
    host: config.get('host'),
    database: config.get('dbname'),
    user: config.get('user'),
    password: config.get('pwd'),
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if(err) console.log("error getting a connection:", err);
    console.log("MYSql connected successfully");
    connection.release();
    if(err) console.log("error releasing connection:", err);
})

module.exports = pool;