const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Routes here
app.use("/api/auth", authRoutes);

// global error Handler
app.use(errorHandler);

module.exports = app;
