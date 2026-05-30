const mongoose = require('mongoose');

// Cache the connection across serverless invocations (Vercel)
let cached = global._mongooseCache;
if (!cached) {
    cached = global._mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
    // Already connected — reuse
    if (cached.conn) {
        return cached.conn;
    }

    // Connection in progress — wait for it
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
        }).then((m) => {
            console.log('Connected to MongoDB');
            return m;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        console.error('Error connecting to MongoDB', err);
        throw err;
    }

    return cached.conn;
}

module.exports = connectDB;