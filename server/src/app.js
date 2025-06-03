const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const sourceRoutes = require("./routes/sourceRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Routes here
app.use("/api/auth", authRoutes);
app.use("/api/sources", sourceRoutes);
app.use("/api/expenses", expenseRoutes);

// global error Handler
app.use(errorHandler);

module.exports = app;
