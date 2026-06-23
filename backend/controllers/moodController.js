const Mood = require("../models/Mood");

const saveMood = async (req, res) => {

    try {

        const { mood, note } = req.body;

        const newMood = await Mood.create({
            userId: req.user.id,
            mood,
            note
        });

        res.status(201).json({
            message: "Mood Saved",
            data: newMood
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = { saveMood };
const getMoodHistory = async (req, res) => {

    try {

        const moods = await Mood.find({
            userId: req.user.id
        }).sort({
            createdAt: -1
        });

        res.json(moods);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = { saveMood, getMoodHistory };