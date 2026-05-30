require('dotenv').config();
const app = require('../src/app');
const connectDB = require('../src/db/db');

// Vercel serverless: wrap app to ensure DB is connected before each request
module.exports = async (req, res) => {
    await connectDB();
    return app(req, res);
};
