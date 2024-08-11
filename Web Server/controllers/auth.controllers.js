const axios = require('axios');
// const { register_user, login_user } = require('../../API Server/controllers/user.controllers');

// Get registration page
get_register_page = (req, res) => {
    res.render('register'); // EJS file for registration
};

// Register user
register_user = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/register', req.body);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        console.error(error);  // Add this line for debugging
        res.render('register', { error: error || 'Registration failed. Please try again.' });
    }
};


// Get login page
get_login_page = (req, res) => {
    res.render('login'); // EJS file for login
};

// Login user
login_user = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', req.body);
        res.send(response.data);
        // res.redirect('/auth/profile');
    } catch (error) {
        res.render('login', { error: error});
    }
};

// Get profile page
get_profile_page = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/users/profile', {
            headers: { 'Authorization': `Bearer ${req.session.user.token}` }
        });
        res.render('profile', { user: response.data });
    } catch (error) {
        res.redirect('/auth/login');
    }
};

// Update user profile
update_user_profile = async (req, res) => {
    try {
        const response = await axios.put('http://localhost:3000/api/users/profile', req.body, {
            headers: { 'Authorization': `Bearer ${req.session.user.token}` }
        });
        res.redirect('/auth/profile');
    } catch (error) {
        res.render('profile', { error: error.response.data.message });
    }
};

module.exports = {
    get_register_page,
    register_user,
    get_login_page,
    login_user,
    get_profile_page,
    update_user_profile,
};
