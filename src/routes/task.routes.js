const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const taskController = require('../controllers/task.controller');
const { validate } = require('../middlewares/validator');

// VALIDACION PARA CREAR Y ACTUALIZAR TAREAS
const taskValidation = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isString().withMessage('El título debe ser una cadena de texto'),
    body('completed')
        .optional().isBoolean().withMessage('El estado de completado debe ser un booleano'),
    validate
];

// RUTAS PARA PETICIONES CRUD
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskValidation, taskController.createTask);
router.put('/:id', taskValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;