const axios = require('axios');
const weather_forecast_model = require('../models/weather.models.js');
const user_model = require('../models/user.models.js');
const jwt = require('jsonwebtoken');

get_weather_forecast = async (req, res) => {
    try {
        // const user_id = req.user._id;
        const token = req.body.token;
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await user_model.findById(data._id);
        
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const location = user.location;
        const weather_api_key = process.env.WEATHER_API_KEY;
        const weather_url = `http://api.openweathermap.org/data/2.5/forecast?q=guj&units=metric&appid=${weather_api_key}`;

        const weather_response = await axios.get(weather_url);
        const forecast_data = weather_response.data.list.map(forecast => ({
            date: new Date(forecast.dt * 1000),
            temperature: forecast.main.temp,
            humidity: forecast.main.humidity,
            precipitation: forecast.pop * 100,
            wind_speed: forecast.wind.speed,
            alerts: [] // Populate with any weather alerts if needed
        }));

        const weather_forecast = new weather_forecast_model({
            user_id,
            location,
            forecast_data
        });

        await weather_forecast.save();

        res.send({
            message: 'Weather forecast fetched successfully',
            weather_forecast
        });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch weather forecast', details: error.message });
    }
};

module.exports = {
    get_weather_forecast,
};