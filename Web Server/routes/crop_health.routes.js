const express = require('express');
const router = express.Router();
const crop_health_controller = require('../controllers/crop_heath.controllers');

// Route to render the crop health page
router.get('/', crop_health_controller.render_crop_health_page);

// Route to handle the crop health analysis
router.post('/analyze', crop_health_controller.analyze_crop_health);

module.exports = router;
