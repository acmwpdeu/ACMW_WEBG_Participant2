const community_forum_model = require('../models/community_forum.models');
const user_model = require('../models/users.models');

// Create a new post
create_post = async (req, res) => {
    const { post_title, post_content, tags } = req.body;

    try {
        const post = new community_forum_model({
            user_id: req.user._id,
            post_title,
            post_content,
            tags
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};

// Get all posts or filter by criteria
get_all_posts = async (req, res) => {
    try {
        const posts = await community_forum_model.find().populate('user_id', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

// Get a specific post by ID
get_post_by_id = async (req, res) => {
    try {
        const post = await community_forum_model.findById(req.params.id)
            .populate('user_id', 'username')
            .populate('comments.user_id', 'username');
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

// Add a comment to a post
add_comment = async (req, res) => {
    const { comment_content } = req.body;

    try {
        const post = await community_forum_model.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.comments.push({
            user_id: req.user._id,
            comment_content
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
};

// Vote on a post
vote_post = async (req, res) => {
    const { vote_type } = req.body;

    try {
        const post = await community_forum_model.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const existingVote = post.votes.find(vote => vote.user_id.equals(req.user._id));
        if (existingVote) {
            existingVote.vote_type = vote_type;
        } else {
            post.votes.push({
                user_id: req.user._id,
                vote_type
            });
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to vote on post' });
    }
};


module.exports = {
    create_post,
    get_all_posts,
    get_post_by_id,
    add_comment,
    vote_post,
};