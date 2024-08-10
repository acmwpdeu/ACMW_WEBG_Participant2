const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const user_controller = require('../controllers/user.controllers');

// User registration route
router.post('/register',
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    user_controller.register_user
);

// User login route
router.post('/login',
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    user_controller.login_user
);

module.exports = router;