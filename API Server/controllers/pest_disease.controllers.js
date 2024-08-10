const pest_disease_alert_model = require('../models/pest_disease.models');

// Fetch all pest and disease alerts
get_alerts = async (req, res) => {
    try {
        const alerts = await pest_disease_alert_model.find();
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new pest or disease alert
create_alert = async (req, res) => {
    const { crop_id, alert_type, description, date_reported } = req.body;
    try {
        const alert = new pest_disease_alert_model({
            crop_id,
            alert_type,
            description,
            date_reported
        });
        await alert.save();
        res.status(201).json(alert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fetch a specific alert by ID
get_alert_by_id = async (req, res) => {
    try {
        const alert = await pest_disease_alert_model.findById(req.params.id);
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.json(alert);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a specific alert by ID
update_alert = async (req, res) => {
    try {
        const alert = await pest_disease_alert_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.json(alert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a specific alert by ID
delete_alert = async (req, res) => {
    try {
        const alert = await pest_disease_alert_model.findByIdAndDelete(req.params.id);
        if (!alert) return res.status(404).json({ message: 'Alert not found' });
        res.json({ message: 'Alert deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    get_alerts,
    create_alert,
    get_alert_by_id,
    update_alert,
    delete_alert,
};
