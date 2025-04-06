require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express');
const connectDB = require('./config/db/db');
const taskRoutes = require('./routes/task.routes');
const { errorHandler, notFoundHandler } = require('./middlewares/error');

// Conexión a la base de datos MongoDB
connectDB();

const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());

// Rutas de la API
app.use('/api/tasks', taskRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de tareas en NodeJS! Desarrollado por AlleyDev');
});

// Middlewares para manejar errores
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});