const Task = require('../models/task.model');

// PETICIONES CRUD

// GET: Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
    }
}

// GET: Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea', error });
    }
}

// POST: Crear una nueva tarea
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;
        const task = new Task({ title, description, completed });
        const savedTask = await task.save();
        res.status(201).json({
            message: 'Tarea creada con éxito',
            task: savedTask
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
        next(error);
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );
        
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json({
            message: 'Tarea actualizada con éxito',
            task
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error });
    }
}

// DELETE: Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json({
            message: 'Tarea eliminada con éxito',
            task
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
    }
}