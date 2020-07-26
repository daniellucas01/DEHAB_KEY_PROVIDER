const mysql = require('mysql');

const connection = mysql.createPool({
    host: "34.87.180.118",
    user: "root",
    password: "secretpassword",
    database: "DEHAB_KEY_PROVIDER"
});

module.exports = connection;
  
