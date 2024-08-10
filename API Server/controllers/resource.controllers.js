const resource_model = require('../models/resource.model');

// Fetch all resources
get_resources = async (req, res) => {
    try {
        const resources = await resource_model.find();
        res.json(resources);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new resource
create_resource = async (req, res) => {
    const { title, description, link, category } = req.body;
    try {
        const resource = new resource_model({
            title,
            description,
            link,
            category
        });
        await resource.save();
        res.status(201).json(resource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fetch a specific resource by ID
get_resource_by_id = async (req, res) => {
    try {
        const resource = await resource_model.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.json(resource);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a specific resource by ID
update_resource = async (req, res) => {
    try {
        const resource = await resource_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.json(resource);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a specific resource by ID
delete_resource = async (req, res) => {
    try {
        const resource = await resource_model.findByIdAndDelete(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.json({ message: 'Resource deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    get_resources,
    create_resource,
    get_resource_by_id,
    update_resource,
    delete_resource,
};