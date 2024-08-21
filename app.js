require('dotenv').config();  // Carga las variables de entorno

const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;  // Usar el puerto definido en .env, o 3000 por defecto

// Conexión a la base de datos
db.connectToDatabase();

app.get('/', (req, res) => {
    res.send('¡Hola Mundo desde Node.js y Docker!');
});

app.get('/health', async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.status(200).send('MongoDB está funcionando correctamente.');
    } catch (error) {
        res.status(500).send('Error al conectar con MongoDB');
    }
});

app.listen(port, () => {
    console.log(`Aplicación escuchando en http://localhost:${port}`);
});
