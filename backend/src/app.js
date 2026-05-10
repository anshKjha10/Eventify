const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const regisRoutes = require("./routes/registration.routes");

const cors = require("cors");
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true    // allows cookies to be sent
}));

app.use(express.json());  // body parser middleware
app.use(cookieParser());  // cookie parser middleware

app.get("/", (req, res) => {
    res.send("Welcome to Eventify API.");
})

app.use('/api/auth', authRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/registration', regisRoutes)

module.exports = app;