const express = require('express');
const Task = require('../models/Task');
const router = express.Router();


// Получение всех задач
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Добавление новой задачи
router.post('/tasks', async (req, res) => {
    const {
        title,
        description,
        status
    } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            status,
        });

        const savedTask = await newTask.save();

        res.json({
            id: savedTask._id,
            title: savedTask.title,
            description: savedTask.description,
            status: savedTask.status,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error adding task'
        });
    }
});

// Удаление задачи
router.delete('/tasks/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: id
        });

        if (!deletedTask) {
            return res.status(404).json({
                error: 'Task not found'
            });
        }

        res.json({
            message: 'Task deleted successfully',
            deletedTask
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});



// Обновление данных задачи
router.patch('/tasks/:id', async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            req.body, {
                new: true
            }
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Удаление всех или завершенных задач
router.delete('/tasks', async (req, res) => {
    try {
        if (req.query.completed) {
            // Удаление завершенных задач
            const deletedTasks = await Task.deleteMany({
                status: 'completed'
            });

            if (deletedTasks.deletedCount === 0) {
                return res.status(404).json({
                    error: 'No completed tasks found'
                });
            }

            res.json({
                message: 'Completed tasks deleted successfully',
                deletedCount: deletedTasks.deletedCount
            });
        } else {
            // Удаление всех задач
            await Task.deleteMany({});
            res.json({
                message: 'All tasks deleted successfully'
            });
        }
    } catch (error) {
        console.error('Error deleting tasks:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});



module.exports = router;