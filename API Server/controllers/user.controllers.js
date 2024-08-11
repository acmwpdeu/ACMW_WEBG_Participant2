const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user_model = require('../models/user.models.js');

// User Registration
register_user = async (req, res) => {
    try {
        const { name, username, email, password, location, crops, profile_picture } = req.body;

        const user = new user_model({
            name,
            username,
            email,
            password: password,
            location,
            crops,
            profile_picture
        });

        await user.save();

        res.status(201).send({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).send({ error: 'Registration failed', details: error.message });
    }
};

// User Login
login_user = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await user_model.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        user_id = user._id;

        const is_match = await bcrypt.compare(password, user.password);
        if (!is_match) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }


        const { access_token, refresh_token } = await user.generate_auth_token();
        req.user = user;

        res.send({
            message: 'Login successful',
            user_id,
            access_token,
            refresh_token
        });
    } catch (error) {
        res.status(500).send({ error: 'Login failed', details: error.message });
    }
};

// View Profile
view_profile = async (req, res) => {
    try {
        // const user_id = req.user._id; // Assuming the user ID is stored in req.user
        const token = req.body.token;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // res.send(data);
        const user = await user_model.findById(data._id).select('-password');

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ user });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch profile', details: error.message });
    }
};

// Edit Profile
edit_profile = async (req, res) => {
    try {
        const user_id = req.user._id; // Assuming the user ID is stored in req.user
        const { username, location, profile_picture } = req.body;

        const user = await user_model.findByIdAndUpdate(
            user_id,
            { username, location, profile_picture },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        res.status(500).send({ error: 'Failed to update profile', details: error.message });
    }
};

module.exports = {
    register_user,
    login_user,
    view_profile,
    edit_profile,
};