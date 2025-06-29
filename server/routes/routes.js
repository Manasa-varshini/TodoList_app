const express = require('express');
const Task = require('../models/models');
const auth = require('../middleware/auth'); // ✅ Import the middleware
const router = express.Router();

// ✅ GET all tasks (requires login)
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Server error');
    }
});

// ✅ POST a new task (requires login)
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (err) {
        console.error('Error saving task:', err);
        res.status(500).send('Server error');
    }
});

// ✅ PUT (update) a task (requires login)
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Server error');
    }
});

// ✅ DELETE a task (requires login)
router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.json(deletedTask);
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
