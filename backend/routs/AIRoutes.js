// routs/aiRoutes.js
const express = require("express");
const { getAISuggestion } = require("../controllers/AIController")
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// POST /api/ai/suggest
router.post("/suggest", authMiddleware, getAISuggestion);

module.exports = router;
