const express = require('express');
const router = express.Router();
const weather_controller = require('../controllers/weather.controller.js');

// Middleware for authentication (assuming you have an auth middleware)
const auth = require('../middleware/auth');

// Route to get weather forecast
router.get('/forecast', auth, weather_controller.get_weather_forecast);

module.exports = router;
