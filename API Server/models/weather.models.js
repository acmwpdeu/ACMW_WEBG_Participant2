const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');

const weather_forecast_schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  location: { type: String, required: true },
  forecast_data: [
    {
      date: { type: Date },
      temperature: { type: Number },
      humidity: { type: Number },
      precipitation: { type: Number },
      wind_speed: { type: Number },
      alerts: [
        {
          type: { type: String }, // e.g., "Heavy Rain", "Frost"
          description: { type: String },
          severity: { type: String } // e.g., "Low", "Medium", "High"
        }
      ]
    }
  ]
}, { timestamps: true });

const weather_forecast_model = connection.model('weather_forecast', weather_forecast_schema, 'weather_forecast');

module.exports = weather_forecast_model;
