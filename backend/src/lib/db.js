import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds socket timeout
            maxPoolSize: 10, // Maximum number of sockets in the connection pool
        });

        console.debug(`MongoDB Connected: ${conn.connection.host}`);
        console.debug(`Database: ${conn.connection.name}`);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.debug('MongoDB disconnected');
        });

        // Handle graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.debug('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);

        // Provide helpful error messages
        if (error.name === 'MongooseServerSelectionError') {
            console.error('\n💡 Troubleshooting tips:');
            console.error('1. Make sure Docker is running');
            console.error('2. Check if MongoDB container is started: docker ps');
            console.error('3. Try: docker-compose up mongodb');
            console.error('4. Check connection string in .env file');
        }

        process.exit(1);
    }
};

export default connectDB;