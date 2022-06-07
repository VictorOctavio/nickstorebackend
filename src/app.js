const express = require('express');
const morgan = require('morgan');

//Inicializar express
const app = express();

//Settings
app.set('port', process.env.PORT || 8080);

//Middelwares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

//configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, auth-token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Rutas
app.use('/api', require('./routes/producto.routes'));
app.use('/api', require('./routes/app.routes'));
app.use('/api', require('./routes/buy.routes'));
app.use('/api', require('./routes/admin.routes'));

//Export module
module.exports = app;