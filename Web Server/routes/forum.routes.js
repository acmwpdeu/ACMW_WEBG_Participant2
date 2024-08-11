const express = require('express');
const router = express.Router();
const forum_controller = require('../controllers/forum.controllers');

// Render the community forum page
router.get('/', forum_controller.get_all_posts);

// Create a new post
router.post('/', forum_controller.create_post);

// Add a comment to a post
router.post('/:id/comments', forum_controller.add_comment);

// Vote on a post
router.post('/:id/vote', forum_controller.vote_post);

module.exports = router;
