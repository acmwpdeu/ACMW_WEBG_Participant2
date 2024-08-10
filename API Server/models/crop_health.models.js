const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');

const crop_health_schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  crop_id: { type: Schema.Types.ObjectId, ref: 'crops', required: true },
  image_url: { type: String, required: true },
  analysis_result: {
    pest_detected: { type: Boolean },
    disease_detected: { type: Boolean },
    recommendations: { type: String }
  }
}, { timestamps: true });

const crop_health_model = connection.model('crop_health', crop_health_schema, 'crop_health');

module.exports = crop_health_model;
