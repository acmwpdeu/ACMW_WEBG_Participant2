const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const crop_health_controller = require('../controllers/crop_health.controllers');

// Analyze crop health route
router.post('/analyze',
    body('crop_id').notEmpty().withMessage('Crop ID is required'),
    body('image_url').isURL().withMessage('Valid image URL is required'),
    crop_health_controller.analyze_crop_health
);

module.exports = router;
