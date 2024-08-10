const express = require('express');
const router = express.Router();
const pest_disease_controller = require('../controllers/pest_disease.controllers');

// Fetch all alerts
router.get('/', pest_disease_controller.get_alerts);

// Report a new alert
router.post('/', pest_disease_controller.create_alert);

// Fetch a specific alert by ID
router.get('/:id', pest_disease_controller.get_alert_by_id);

// Update a specific alert by ID
router.put('/:id', pest_disease_controller.update_alert);

// Delete a specific alert by ID
router.delete('/:id', pest_disease_controller.delete_alert);

module.exports = router;
