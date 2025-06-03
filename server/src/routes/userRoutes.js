const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const updateBudget = require("../controllers/userController");

router.use(protect);

router.put("/budget", updateBudget);

module.exports = router;
