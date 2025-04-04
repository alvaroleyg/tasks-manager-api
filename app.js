const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: 'Empezar API en NodeJS', completed: true },
]

// PETICIONES CRUD
// GET: Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// GET: Obtener una tarea por ID
app.get('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
});

// POST: Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'El título es obligatorio' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json({
        message: 'Tarea creada con éxito',
        task: newTask
    });
});

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de tareas en NodeJS! Desarrollado por AlleyDev');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});