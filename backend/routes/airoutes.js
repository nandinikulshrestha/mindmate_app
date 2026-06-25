const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
  chatWithAI
} = require("../controllers/aiController");

router.post(
  "/chat",
  authMiddleware,
  chatWithAI
);

module.exports = router;