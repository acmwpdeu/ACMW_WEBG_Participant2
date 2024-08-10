const express = require('express');
const router = express.Router();

// Controller
const index_controller = require('../controllers/index.controllers');

// Home page
router.get('/', index_controller.home);

module.exports = router;
