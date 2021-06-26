const commentFormHandler = async function(event) {
    event.preventDefault();
    const postId = document.querySelector('input[name="post_id"]').value;
    const body = document.querySelector('textarea[name="comment_body"]').value;

    if (body) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        document.location.reload();
    }
};

document
.querySelector('#new-comment-form')
.addEventListener('submit', commentFormHandler);