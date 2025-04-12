const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
    try {
        // Verificar si el token está presente en los headers
        const header = req.header('Authorization');
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        // Extraer el token del encabezado Authorization
        const token = header.replace('Bearer ', '');

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secrettemporario');

        // Verificar si el usuario existe en la base de datos
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Agregar el usuario a la solicitud para su uso posterior
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
}