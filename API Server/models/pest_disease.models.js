const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');

const pest_disease_alert_schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  location: { type: String, required: true },
  pest_reports: [
    {
      pest_type: { type: String },
      description: { type: String },
      date: { type: Date },
      severity: { type: String }, // e.g., "Low", "Medium", "High"
      affected_crops: [
        {
          crop_type: { type: String },
          description: { type: String }
        }
      ]
    }
  ],
  disease_reports: [
    {
      disease_type: { type: String },
      description: { type: String },
      date: { type: Date },
      severity: { type: String },
      affected_crops: [
        {
          crop_type: { type: String },
          description: { type: String }
        }
      ]
    }
  ]
}, { timestamps: true });

const pest_disease_alert_model = connection.model('pest_disease_alert', pest_disease_alert_schema, 'pest_disease_alert');

module.exports = pest_disease_alert_model;
