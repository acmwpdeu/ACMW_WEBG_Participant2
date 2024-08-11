const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const user_controller = require('../controllers/user.controllers.js');

// Middleware to handle validation errors
const handle_validation_errors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// User registration route
router.post('/register',
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    handle_validation_errors,
    user_controller.register_user
);

// User login route
router.post('/login',
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    handle_validation_errors,
    user_controller.login_user
);

// View profile route
router.post('/profile', user_controller.view_profile);

// Edit profile route
router.put('/profile',
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('location').optional().notEmpty().withMessage('Location cannot be empty'),
    body('profile_picture').optional().notEmpty().withMessage('Profile picture URL cannot be empty'),
    handle_validation_errors,
    user_controller.edit_profile
);

module.exports = router;