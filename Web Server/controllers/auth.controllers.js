const axios = require('axios');
const user_model = require('../../API Server/models/user.models');
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
        // res.send(response.data);
        res.redirect('/auth/login');
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
        const options = { httpOnly: true, secure: true };
        res.cookie('a_token', response.data.access_token, options).cookie('r_token', response.data.refresh_token, options);
        // res.redirect(`/profile/${data.logged_in_user._id}`);
        res.send(response.data);
        // res.redirect('/auth/profile');
    } catch (error) {
        res.render('login', { error: error});
    }
};

// Get profile page
get_profile_page = async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/profile', { token: req.cookies.a_token });
        // console.log(response);
        // const user = user_model.findOne({_id: respose.data._id});
        res.render('profile', { user: response.data.user });
    } catch (error) {
        // res.redirect('/auth/login');
        res.send("error");
        // console.log(error);
    }
};

// Update user profile
update_user_profile = async (req, res) => {
    try {
        const response = await axios.put('http://localhost:3000/api/users/profile', { token: req.cookies.a_token });
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
