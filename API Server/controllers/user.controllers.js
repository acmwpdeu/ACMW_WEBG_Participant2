const user_model = require('../models/user_model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Register a new user
register_user = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existing_user = await user_model.findOne({ email });
        if (existing_user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const new_user = new user_model({ username, email, password });
        await new_user.save();

        // Generate tokens
        const tokens = await new_user.generate_auth_token();
        res.status(201).json({ user: new_user, ...tokens });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login user and return tokens
login_user = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await user_model.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate tokens
        const tokens = await user.generate_auth_token();
        res.status(200).json(tokens);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register_user,
    login_user,
};