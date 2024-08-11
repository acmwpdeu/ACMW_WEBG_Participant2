document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.getElementById('newPostForm');
    if (newPostForm) {
        newPostForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const title = document.getElementById('post_title').value;
            const content = document.getElementById('post_content').value;
            const tags = document.getElementById('post_tags').value.split(',').map(tag => tag.trim());
            
            try {
                const response = await fetch('/community-forum/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ title, content, tags })
                });
                const result = await response.json();
                if (response.ok) {
                    // Reload or update the posts section
                    location.reload();
                } else {
                    console.error('Error creating post:', result.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const postId = form.dataset.postId;
            const commentContent = form.querySelector('textarea[name="comment_content"]').value;
            
            try {
                const response = await fetch(`/community-forum/${postId}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ comment_content: commentContent })
                });
                const result = await response.json();
                if (response.ok) {
                    // Reload or update the post comments
                    location.reload();
                } else {
                    console.error('Error adding comment:', result.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    const voteButtons = document.querySelectorAll('.vote-button');
    voteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const postId = button.dataset.postId;
            const voteType = button.dataset.voteType;
            
            try {
                const response = await fetch(`/community-forum/${postId}/vote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: JSON.stringify({ vote_type: voteType })
                });
                const result = await response.json();
                if (response.ok) {
                    // Reload or update the post votes
                    location.reload();
                } else {
                    console.error('Error voting on post:', result.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
