const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user_schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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


// middlewares and generators 
user_schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password_hash = await bcrypt.hash(this.password, 10);
    next();
});

user_schema.methods.generate_auth_token = async function(_, _) {
    const user = this;
    const access_token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION});
    const refresh_token = jwt.sign({_id: user._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION});
    return { access_token, refresh_token };
};

const user_model = connection.model("users", user_schema, "users");

module.exports = user_model;