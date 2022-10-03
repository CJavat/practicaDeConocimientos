const express = require('express');
const app = express();
const queries = require('./data-base/queries');

//* PARA AGREGAR UNA PAGINA ESTATICA.
app.use(express.static('public'));
app.use('/productos', express.static('productos'));

//* MIDDLEWARE - Para darle acceso al core de que pueda manipular MYSQL.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//* MIDDLEWARE - Sirve para parsear el body del POST para poderlo obtener.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/productos', (req, res) => {
    res.send('PRUEBA GET.');
});

//! GET
const consulta = async () => {
    const mostrar = await queries.query;

    if(mostrar == 0) {
        app.get('/productos/todos-los-productos', (req, res) => {
            console.clear();
            res.end(JSON.stringify('NO HAY DATOS PARA MOSTRAR.'));
            return console.log('Aún no hay ningún registro en la BASE DE DATOS.');
        });
    }
    else {
        app.get('/productos/todos-los-productos', (req, res) => {
            console.log(mostrar);
            res.send(JSON.stringify(mostrar));
        });
    }
}
consulta();

//! POST
const insertQuery = async () => {
    app.post('/productos/productos-agregados', (req, res) => {
        const nombre = req.body.nombre;
        const marca = req.body.marca;
        const existencias = req.body.existencias;
    
        module.exports.nombre = nombre;
        module.exports.marca = marca;
        module.exports.existencias = existencias;
    
        queries.insert();
        res.redirect('/productos');
    });
}
insertQuery();

app.listen(5050, () => {
    console.log('Servidor escuchando en el puerto 5050...');
});