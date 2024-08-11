const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connection } = require('../config/database.config');

const community_forum_schema = new Schema({
  // user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  post_title: { type: String, required: true },
  post_content: { type: String, required: true },
  tags: [{ type: String }], // e.g., ["pest-control", "weather-tips"]
  comments: [
    {
      comment_id: { type: Schema.Types.ObjectId, ref: 'comments' },
      user_id: { type: Schema.Types.ObjectId, ref: 'users' },
      comment_content: { type: String },
      created_at: { type: Date, default: Date.now }
    }
  ],
  votes: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: 'users' },
      vote_type: { type: String } // e.g., "upvote" or "downvote"
    }
  ]
}, { timestamps: true });

const community_forum_model = connection.model('community_forum', community_forum_schema, 'community_forum');

module.exports = community_forum_model;
