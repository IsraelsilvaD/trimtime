const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
require('../database');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(busboy());
app.use(busboyBodyParser());
app.use(cors());

// Variables
app.set('port', 8000);

// Rotas
app.use('/barbearia',require('./src/routes/barbearia.routes'));

app.listen(app.get('port'), () => {
    console.log(`ws Escutando na porta ${app.get('port')}`);
});