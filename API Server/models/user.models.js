const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');

const user_schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  location: { type: String },
  crops: [
    {
      crop_type: { type: String },
      planting_date: { type: Date },
      expected_harvest_date: { type: Date }
    }
  ],
  profile_picture: { type: String }, // URL to profile picture
}, { timestamps: true });

const user_model = connection.model("users", user_schema, "users");

module.exports = user_model;