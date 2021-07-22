const mysql = require('mysql2');
require("dotenv").config();

const connection = async () => { 
    try {
    await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
    } catch (error) {
        console.log(error);
    }
};

// connection.connect((error) => {
//     if (error) console.log(error);
//     console.log('Successfully connected to the database');
// });

const closeConnection = () => {
    mysql.close()
};

module.exports = {connection, closeConnection};