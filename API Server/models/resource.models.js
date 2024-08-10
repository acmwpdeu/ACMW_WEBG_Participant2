const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');

const resource_library_schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['article', 'video'], required: true },
  url: { type: String, required: true }, // URL to the resource
  description: { type: String },
  tags: [{ type: String }] // e.g., ["crop-management", "pest-control"]
}, { timestamps: true });

const resource_library_model = connection.model('resource_library', resource_library_schema, 'resource_library');

module.exports = resource_library_model;
