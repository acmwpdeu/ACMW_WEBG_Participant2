const notification_model = require('../models/notification_model');

// Fetch all notifications
get_notifications = async (req, res) => {
    try {
        const notifications = await notification_model.find();
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new notification
create_notification = async (req, res) => {
    const { user_id, message, type, status } = req.body;
    try {
        const notification = new notification_model({
            user_id,
            message,
            type,
            status
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fetch a specific notification by ID
get_notification_by_id = async (req, res) => {
    try {
        const notification = await notification_model.findById(req.params.id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json(notification);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a specific notification by ID
update_notification = async (req, res) => {
    try {
        const notification = await notification_model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json(notification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a specific notification by ID
delete_notification = async (req, res) => {
    try {
        const notification = await notification_model.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ message: 'Notification not found' });
        res.json({ message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    get_notifications,
    create_notification,
    get_notification_by_id,
    update_notification,
    delete_notification,
};
