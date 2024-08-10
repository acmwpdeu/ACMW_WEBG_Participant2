const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');

const notification_schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  type: { type: String, required: true }, // e.g., "weather-update", "pest-alert", "community-interaction"
  message: { type: String, required: true },
  is_read: { type: Boolean, default: false }
}, { timestamps: true });

const notification_model = connection.model('notification', notification_schema, 'notification');

module.exports = notification_model;
