const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    saveMood,
    getMoodHistory
} = require("../controllers/moodController");

router.post("/save", authMiddleware, saveMood);

router.get("/history", authMiddleware, getMoodHistory);

module.exports = router;