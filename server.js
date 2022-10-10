const queries = require('./data-base/queries');
const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

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
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.get('/productos', (req, res) => {
    res.send('PRUEBA GET.');
});

//! GET
app.get('/productos/todos-los-productos', async (req, res) => {
    const mostrar = await queries.query();
    
    if(mostrar == 0) {
        app.get('/productos/todos-los-productos', (req, res) => {
            console.clear();
            res.end(JSON.stringify('NO HAY DATOS PARA MOSTRAR.'));
            return console.log('Aún no hay ningún registro en la BASE DE DATOS.');
        });
    }
    else {
        res.json(mostrar);
    }
});

//! POST
const insertQuery = async () => { //productos-agregados
    app.post('/productos/todos-los-productos', async (req, res) => {
        const { nombre, marca, existencias } = req.body;

        module.exports.nombre = nombre;
        module.exports.marca = marca;
        module.exports.existencias = existencias;
        
        const insert = await queries.insert();
        res.status(200).send({
            id: insert.insertId,
            nombre,
            marca,
            existencias
        }, res.redirect('/productos'));
    });
}
insertQuery();

const PORT =  process.env.PORT | 5000;
httpServer.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto 5050...');
});