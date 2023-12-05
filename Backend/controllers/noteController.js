// noteController.js
const Note = require('../models/note');

exports.getAllNotes = async (req, res) => {
    try {
        // Fetch notes based on the logged-in user's ID
        const notes = await Note.find({ userId: req.user.id });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createNote = async (req, res) => {
    try {
        const newNote = new Note({
            userId: req.user.id,
            heading: req.body.heading,
            text: req.body.text
        });
        await newNote.save();
        res.status(201).json({ message: 'Note created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { heading, text } = req.body;

        const note = await Note.findByIdAndUpdate(id, { heading, text }, { new: true });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note updated successfully', note });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
