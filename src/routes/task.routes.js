const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

// RUTAS PARA PETICIONES CRUD

// GET: Obtener todas las tareas
router.get('/', TaskController.getAllTasks);

// GET: Obtener una tarea por ID
router.get('/:id', TaskController.getTaskById);

// POST: Crear una nueva tarea
router.post('/', TaskController.createTask);

// PUT: Actualizar una tarea por ID
router.put('/:id', TaskController.updateTask);

// DELETE: Eliminar una tarea por ID
router.delete('/:id', TaskController.deleteTask);

module.exports = router;