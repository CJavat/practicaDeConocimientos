const dataHost = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    port: 3306,
    database: "javatoinc"
}

const mysql2 = require('mysql2/promise');

const conexionMySQL = async () => {
    const connection = await mysql2.createConnection(dataHost);

    connection.connect(err => {
        if(err) {
            return console.log("OCURRIÓ UN ERROR AL CONECTARSE EN LA BASE DE DATOS.");
        }
        console.log("CONEXIÓN ESTABLECIDA CORRECTAMENTE CON LA BASE DE DATOS.");
    });
    return connection;
}

module.exports = conexionMySQL();