const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/profile', auth, userController.updateProfile);

module.exports = router;
