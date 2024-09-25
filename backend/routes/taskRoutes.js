const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.put('/', auth, taskController.updateTask);
router.delete('/', auth, taskController.deleteTask);

module.exports = router;
