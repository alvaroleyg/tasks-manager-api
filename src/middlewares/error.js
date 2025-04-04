exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err : {} // Solo mostrar el error en desarrollo
    });
}

exports.notFoundHandler = (req, res, next) => {
    res.status(404).json({
        message: 'Recurso no encontrado'
    });
};