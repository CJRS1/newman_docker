require('dotenv').config();  // Carga las variables de entorno

const mongoose = require('mongoose');
const express = require('express');
const db = require('./db');  // Asegúrate de que la ruta es correcta

const app = express();
const port = process.env.PORT || 3000;  // Usar el puerto definido en .env, o 3000 por defecto

// Conexión a la base de datos
db.connectToDatabase();

// Middleware para manejar errores de conexión a la base de datos
app.use((req, res, next) => {
    if (mongoose.connection.readyState === 0) {
        res.status(500).send('No se puede conectar a la base de datos');
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    res.send('¡Hola soy el alumno Christian Reyes y esta es mi aplicación!');
});


app.listen(port, () => {
    console.log(`Aplicación escuchando en http://localhost:${port}`);
});
