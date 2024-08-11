const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define the route for the weather forecast page
router.get('/forecast', async (req, res) => {
    try {
        // Call the API server to get weather forecast data
        const api_server_url = 'http://localhost:3000/api/weather/forecast'; // Adjust the URL as needed
        const response = await axios.post(api_server_url, {token: req.cookies.a_token}, {
            headers: {
                'Authorization': `Bearer ${req.cookies.a_token}` // Assuming you use token-based authentication
            }
        });

        const weather_data = response.data.weather_forecast;
        res.render('weather', {
            location: weather_data.location,
            forecast_data: weather_data.forecast_data
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Failed to load weather forecast');
    }
});

module.exports = router;
