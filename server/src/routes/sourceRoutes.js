const express = require("express");
const router = express.Router();
const sourceController = require("../controllers/sourceController");
const protect = require("../middlewares/authMiddleware");

router.use(protect);

router.post("/", sourceController.addSource);
router.get("/", sourceController.getSources);
router.post("/:id/deposit", sourceController.depositToSource);
router.put("/transfer", sourceController.transferFunds);

module.exports = router;
