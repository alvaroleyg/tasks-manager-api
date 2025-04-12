const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');
const { validate } = require('../middlewares/validator');

// VALIDACION PARA REGISTRO Y LOGIN
const registerValidation = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isString().withMessage('El nombre de usuario debe ser una cadena de texto'),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El correo electrónico no es válido')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validate
];

// VALIDACION PARA LOGIN
const loginValidation = [
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio')
        .isEmail().withMessage('El correo electrónico no es válido')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    validate
];

// RUTAS PARA REGISTRO Y LOGIN
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router;