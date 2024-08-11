const axios = require('axios');

get_dashboard_page = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/users/profile', { token: req.cookies.a_token });

        const user = response.data.user;
        const notifications = response.data.notifications; // Assuming this is fetched from the backend

        res.render('dashboard', { user, notifications });
    } catch (error) {
        console.error(error);
        res.redirect('/auth/login');
    }
};

module.exports = {
    get_dashboard_page
};
