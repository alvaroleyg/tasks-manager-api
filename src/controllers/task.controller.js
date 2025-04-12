const Task = require('../models/task.model');

// PETICIONES CRUD

// GET: Obtener todas las tareas
exports.getAllTasks = async (req, res, next) => {
    try {
        // Opciones de filtrado
        const { completed, page = 1, limit = 10 } = req.query;
        const query = { user: req.user._id };

        // Filtrar por estado si se proporciona
        if (completed !== undefined) {
            query.completed = completed === 'true';
        }

        // Convertir a números
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        // Calcular salto para paginación
        const skip = (pageNumber - 1) * limitNumber;

        // Ejecutar consulta con paginación
        const totalTasks = await Task.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        // Contar total de documentos para metadatos de paginación
        const totalCount = await Task.countDocuments(query);

        res.status(200).json({
            message: 'Tareas obtenidas con éxito',
            tasks,
            pagination: {
                total: totalCount,
                currentPage: pageNumber,
                itemsPerPage: limitNumber,
                totalPages: Math.ceil(totalCount / limitNumber),
            }

        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error });
        next(error);
    }
}

// GET: Obtener una tarea por ID
exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById({
            _id: req.params.id,
            user : req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.status(201).json({
            message: 'Tarea encontrada con éxito',
            task
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea', error });
        next(error);
    }
}

// POST: Crear una nueva tarea
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;
        const task = new Task({
            title,
            description,
            completed,
            user: req.user._id
        });

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

exports.updateTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;

        const task = await Task.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, description, completed },
            { new: true, runValidators: true }
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
        next(error);
    }
}

// DELETE: Eliminar una tarea
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json({
            message: 'Tarea eliminada con éxito',
            task
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error });
        next(error);
    }
}