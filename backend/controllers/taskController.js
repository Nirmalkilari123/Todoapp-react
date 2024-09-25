const uuid = require('uuid');
const db = require('../db');

exports.createTask = (req, res) => {
    const { title, description, status } = req.body;
    const userId = req.user.id;
    const taskId = uuid.v4();

    db.run(`INSERT INTO tasks (id, user_id, title, description, status) VALUES (?, ?, ?, ?, ?)`,
        [taskId, userId, title, description, status],
        function(err) {
            if (err) return res.status(400).send(err.message);
            res.status(201).json({ message: 'Task created successfully' });
        }
    );
};

exports.getTasks = (req, res) => {
    const userId = req.user.id;
    db.all(`SELECT * FROM tasks WHERE user_id = ?`, [userId], (err, tasks) => {
        if (err) return res.status(400).send(err.message);
        res.json(tasks);
    });
};

exports.updateTask = (req, res) => {
    const { id, title, description, status } = req.body;
    const userId = req.user.id;

    db.run(`UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?`, 
        [title, description, status, id, userId],
        function(err) {
            if (err) return res.status(400).send(err.message);
            res.status(200).json({ message: 'Task updated successfully' });
        }
    );
};

exports.deleteTask = (req, res) => {
    const { id } = req.body;
    const userId = req.user.id;

    db.run(`DELETE FROM tasks WHERE id = ? AND user_id = ?`, 
        [id, userId],
        function(err) {
            if (err) return res.status(400).send(err.message);
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    );
};
