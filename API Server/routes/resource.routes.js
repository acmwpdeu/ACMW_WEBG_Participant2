const express = require('express');
const router = express.Router();
const resource_controller = require('../controllers/resource.controllers');

// Fetch all resources
router.get('/', resource_controller.get_resources);

// Create a new resource
router.post('/', resource_controller.create_resource);

// Fetch a specific resource by ID
router.get('/:id', resource_controller.get_resource_by_id);

// Update a specific resource by ID
router.put('/:id', resource_controller.update_resource);

// Delete a specific resource by ID
router.delete('/:id', resource_controller.delete_resource);

module.exports = router;
