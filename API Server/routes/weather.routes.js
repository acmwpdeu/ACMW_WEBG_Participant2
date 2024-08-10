const express = require('express');
const router = express.Router();
const weather_controller = require('../controllers/weather.controllers.js');

// Middleware for authentication (assuming you have an auth middleware)
// const auth = require('../middleware/auth');

// Route to get weather forecast
// router.get('/forecast', auth, weather_controller.get_weather_forecast);
router.get('/forecast', weather_controller.get_weather_forecast);

module.exports = router;
