const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const regisRoutes = require("./routes/registration.routes");
const organizerRoutes = require("./routes/organizer.routes");
const cors = require("cors");
const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true // allows cookies to be sent
}));

app.use(express.json());  // body parser middleware
app.use(cookieParser());  // cookie parser middleware

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get("/", (req, res) => {
    res.send("Welcome to Eventify API.");
})

app.use('/api/auth', authRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/registration', regisRoutes)
app.use('/api/organizer', organizerRoutes)

module.exports = app;