const mysql = require('mysql');

const pool = mysql.createPool({
    host: '172.19.64.1',
    database: 'cnstrct',
    user: 'root',
    password: 'root123',
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if(err) console.log("error getting a connection:", err);
    console.log("MYSql connected successfully");
    connection.release();
    if(err) console.log("error releasing connection:", err);
})

module.exports = pool;