const mysql = require('mysql');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.MYSQL_DB,
    port: process.env.DB_PORT
});

module.exports = connection;