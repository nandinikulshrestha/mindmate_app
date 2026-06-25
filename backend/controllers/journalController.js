const Journal = require("../models/journal");

const createJournal = async (req, res) => {

    try {

        const { title, content } = req.body;

        const journal = await Journal.create({
            userId: req.user.id,
            title,
            content
        });

        res.status(201).json({
            message: "Journal Created",
            journal
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const getJournals = async (req, res) => {

    try {

        const journals = await Journal.find({
            userId: req.user.id
        }).sort({
            createdAt: -1
        });

        res.json(journals);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createJournal,
    getJournals
};