const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const community_forum_controller = require('../controllers/community_forum.controllers');

// Create a new post
router.post('/posts',
    body('post_title').notEmpty().withMessage('Post title is required'),
    body('post_content').notEmpty().withMessage('Post content is required'),
    community_forum_controller.create_post
);

// Get all posts or filter by criteria
router.get('/posts', community_forum_controller.get_all_posts);

// Get a specific post by ID
router.get('/posts/:id', community_forum_controller.get_post_by_id);

// Add a comment to a post
router.post('/posts/:id/comments',
    body('comment_content').notEmpty().withMessage('Comment content is required'),
    community_forum_controller.add_comment
);

// Vote on a post
router.post('/posts/:id/votes',
    body('vote_type').isIn(['upvote', 'downvote']).withMessage('Invalid vote type'),
    community_forum_controller.vote_post
);

module.exports = router;
