const express = require('express');
const app = express();

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

// app.get('/', (req, res) => {
//     res.send('Servidor funcionando perfectamente.');
// })

app.listen(5050, () => {
    console.log('Servidor escuchando en el puerto 5050...');
});