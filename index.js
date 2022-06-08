const express = require('express');
const cors = require('cors');
require('dotenv').config();

// crear el sevidor/aplicacion de express
const app = express();

//directorio publico
app.use(express.static('public'))

// cors
app.use(cors())

// lectura y parseo de datos
app.use(express.json());

// rutas
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT, () => {console.log(`servidor corriendo en el puerto ${process.env.PORT}`);});