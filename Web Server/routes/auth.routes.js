const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth.controllers');

// User registration route
router.get('/register', auth_controller.get_register_page);
router.post('/register', auth_controller.register_user);

// User login route
router.get('/login', auth_controller.get_login_page);
router.post('/login', auth_controller.login_user);

// User profile route
router.get('/profile', auth_controller.get_profile_page);
router.post('/profile', auth_controller.update_user_profile);

module.exports = router;
