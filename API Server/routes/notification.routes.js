const express = require('express');
const router = express.Router();
const notification_controller = require('../controllers/notification.controllers');

// Fetch all notifications
router.get('/', notification_controller.get_notifications);

// Create a new notification
router.post('/', notification_controller.create_notification);

// Fetch a specific notification by ID
router.get('/:id', notification_controller.get_notification_by_id);

// Update a specific notification by ID
router.put('/:id', notification_controller.update_notification);

// Delete a specific notification by ID
router.delete('/:id', notification_controller.delete_notification);

module.exports = router;
