const connection = require('./conexion');
const server = require('../server');

const query = async () => {
    const [rows, fields] = await (await connection).execute('SELECT * FROM productos');
    return rows;
}
query();

const insert = async () => {
    const insertInto = `
        INSERT INTO productos(nombre_producto, marca_producto, numero_existencias) 
        VALUES('${server.nombre}', '${server.marca}', ${server.existencias});
    `;
    try {
        const [rows, fields] = await (await connection).query(insertInto);
        return rows;
    }
    catch(err) {
        return console.log("OCURRIÓ UN ERROR EN LA BASE DE DATOS. - ERROR: " + err);
    }
}

module.exports.query = query();
module.exports.insert = insert;