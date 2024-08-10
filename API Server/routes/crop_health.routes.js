const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const crop_health_controller = require('../controllers/crop_health.controllers');

// Submit crop health data
router.post('/submit',
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('crop_id').notEmpty().withMessage('Crop ID is required'),
    body('image_url').notEmpty().withMessage('Image URL is required'),
    body('analysis_result').isObject().withMessage('Analysis result must be an object'),
    crop_health_controller.submit_crop_health
);

// Get crop health data for a specific user
router.get('/:user_id',
    param('user_id').isMongoId().withMessage('Invalid User ID'),
    crop_health_controller.get_crop_health_by_user
);

module.exports = router;
