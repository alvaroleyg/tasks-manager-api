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

app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title !== undefined ? title : tasks[taskIndex].title,
        completed: completed !== undefined ? completed : tasks[taskIndex].completed
    }

    res.json({
        message: 'Tarea actualizada con éxito',
        task: tasks[taskIndex]
    });
});

// DELETE: Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada con éxito' });
});

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de tareas en NodeJS! Desarrollado por AlleyDev');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});