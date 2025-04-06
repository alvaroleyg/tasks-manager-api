const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"],
        trim: true,
        minlength: [3, "El título debe tener al menos 3 caracteres"],
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);