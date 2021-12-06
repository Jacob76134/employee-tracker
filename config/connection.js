const mysql = require('mysql2');
// const dotenv = require("dotenv");

// const result = dotenv.config()

require('dotenv').config();



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'all_employees',
    password: process.env.DB_PASSWORD,
});


  
module.exports = connection;
  