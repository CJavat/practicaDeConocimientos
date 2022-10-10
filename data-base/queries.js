const server = require('../server');
const { dataHost } = require('./conexion');

const query = async () => {
    const [rows] = await dataHost.query('SELECT * FROM productos');
    return rows;
}

const insert = async () => {
    const insertInto = `
        INSERT INTO productos(nombre_producto, marca_producto, numero_existencias) 
        VALUES('${server.nombre}', '${server.marca}', ${server.existencias});
    `;
    try {
        const [rows] = await dataHost.query(insertInto);
        return rows;
    }
    catch(err) {
        return console.log("OCURRIÓ UN ERROR EN LA BASE DE DATOS. - ERROR: " + err);
    }
}

module.exports.query = query;
module.exports.insert = insert;