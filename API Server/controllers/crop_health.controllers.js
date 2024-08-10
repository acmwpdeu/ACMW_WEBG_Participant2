const crop_health_model = require('../models/crop_health.models');
const { validationResult } = require('express-validator');

// Submit crop health data
submit_crop_health = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user_id, crop_id, image_url, analysis_result } = req.body;

        // Create a new crop health record
        const new_crop_health = new crop_health_model({
            user_id,
            crop_id,
            image_url,
            analysis_result
        });
        await new_crop_health.save();

        res.status(201).json({ message: 'Crop health data submitted successfully', crop_health: new_crop_health });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get crop health data for a specific user
get_crop_health_by_user = async (req, res) => {
    const { user_id } = req.params;

    try {
        const crop_health_data = await crop_health_model.find({ user_id });
        res.status(200).json(crop_health_data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    submit_crop_health,
    get_crop_health_by_user,
};
