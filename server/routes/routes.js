const express = require('express');
const Task = require('../models/models');
const auth = require('../middleware/auth'); 
const router = express.Router();


router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Server error');
    }
});


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
