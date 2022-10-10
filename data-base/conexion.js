const mysql2 = require('mysql2/promise').createPool;
const dataHost = mysql2({
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "javatoinc"
});

module.exports.dataHost = dataHost;