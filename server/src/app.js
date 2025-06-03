const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const authRoutes = require("./routes/authRoutes");
const sourceRoutes = require("./routes/sourceRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes here
app.use("/api/auth", authRoutes);
app.use("/api/sources", sourceRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/user", userRoutes);

// global error Handler
app.use(errorHandler);

module.exports = app;
