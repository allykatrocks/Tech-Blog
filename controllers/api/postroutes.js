const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const sequelize = require('../../config/config');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {model: User, attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
    }).then(dbPostData => {
        console.log(dbPostData)
        res.json(dbPostData.reverse())})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {where: {id: req.params.id}})

        if (updatedPost) {
            res.status(201).end()
        } else {
            res.status(404).end()
        }
    }
})

module.exports = router;