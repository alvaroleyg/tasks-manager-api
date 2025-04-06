const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Conexión a MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error: ${error.message}', error);
        process.exit(1);
    }
}