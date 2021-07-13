const commentFormHandler = async function(event) {
    event.preventDefault();
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
    console.log(postId, body)
    if (body) {
        var response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(response)
        document.location.reload();
    }
};

document
.querySelector('#new-comment-form')
.addEventListener('submit', commentFormHandler);