const axios = require('axios');

// Replace with your API server URL
const API_SERVER_URL = 'http://localhost:3000/api/community-forum';

// Fetch all posts
exports.get_all_posts = async (req, res) => {
    try {
        const response = await axios.get(`${API_SERVER_URL}/posts`);
        const posts = response.data;
        res.render('forum', { posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.render('forum', { posts: [] }); // Render empty posts on error
    }
};

// Create a new post
exports.create_post = async (req, res) => {
    const { post_title, post_content, tags } = req.body;
    try {
        await axios.post(`${API_SERVER_URL}/posts`, {
            post_title,
            post_content,
            tags
        });
        res.redirect('/community-forum'); // Redirect to the forum page after posting
    } catch (error) {
        console.error('Error creating post:', error);
        res.redirect('/community-forum'); // Redirect even on error
    }
};

// Add a comment to a post
exports.add_comment = async (req, res) => {
    const post_id = req.params.id;
    const { comment_content } = req.body;
    try {
        await axios.post(`${API_SERVER_URL}/${post_id}/comments`, {
            comment_content
        });
        res.redirect('/community-forum'); // Redirect to the forum page after commenting
    } catch (error) {
        console.error('Error adding comment:', error);
        res.redirect('/community-forum'); // Redirect even on error
    }
};

// Vote on a post
exports.vote_post = async (req, res) => {
    const post_id = req.params.id;
    const { vote_type } = req.body;
    try {
        await axios.post(`${API_SERVER_URL}/${post_id}/vote`, {
            vote_type
        });
        res.redirect('/community-forum'); // Redirect to the forum page after voting
    } catch (error) {
        console.error('Error voting on post:', error);
        res.redirect('/community-forum'); // Redirect even on error
    }
};
