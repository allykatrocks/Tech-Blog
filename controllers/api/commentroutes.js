const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const newComment = await Comment.create({
            comment_text: req.body.body,
            post_id: req.body.postId,
            user_id: req.session.user_id,
        });
        console.log(newComment)
        res.json(newComment);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router;