const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserDetails);
router.put('/:id/status', userController.updateUserStatus);

module.exports = router;