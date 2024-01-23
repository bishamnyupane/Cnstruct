import mysql from 'mysql2/promise';

try{
const pool = mysql.createPool({
    host: '172.19.64.1',
    database: 'cnstrct',
    user: 'root',
    password: 'root123',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
} catch(err)
{
    console.log("error while creating pool :", err);
}

module.exports = { pool };