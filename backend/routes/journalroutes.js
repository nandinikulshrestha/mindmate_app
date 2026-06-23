const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createJournal,
    getJournals
} = require("../controllers/journalController");

router.post(
    "/add",
    authMiddleware,
    createJournal
);

router.get(
    "/all",
    authMiddleware,
    getJournals
);

module.exports = router;