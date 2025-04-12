const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Generar token JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secrettemporario', {
        expiresIn: '1h',
    });
};

// Registrar un nuevo usuario
exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Crear un nuevo usuario
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generar token JWT
        const token = generateToken(newUser._id);

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
        next(error);
    }
};

// Iniciar sesión de usuario
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico inexistente' });
        }

        // Verificar la contraseña
        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
        next(error);
    }
}
