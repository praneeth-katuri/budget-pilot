const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const protect = require("../middlewares/authMiddleware");

router.use(protect);

router.post("/", expenseController.addExpense);
router.get("/", expenseController.getExpenses);

module.exports = router;
