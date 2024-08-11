const express = require('express');
const router = express.Router();
const dashboard_controller = require('../controllers/dashboard.controllers');

// Dashboard route
router.get('/dashboard', dashboard_controller.get_dashboard_page);

module.exports = router;
