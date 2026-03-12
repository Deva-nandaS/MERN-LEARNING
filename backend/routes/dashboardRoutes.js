const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getDashboard);

module.exports = router;