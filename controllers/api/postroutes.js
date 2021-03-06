const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const sequelize = require('../../config/config');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
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
            console.log('successfully updated')
            res.status(201).end()
        } else {
            res.status(404).end()
        }
    } catch (err) {
        console.log('Failed to update personal post. Line 39')
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        await Post.destroy({
            where: {id: req.params.id},
        })
        res.status(200).json({success: true})
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({...req.body, user_id: req.session.user_id})

        if (newPost) {
            console.log('successfully created')
            res.status(201).end()
        } else {
            res.status(404).end()
        }
    } catch (err) {
        console.log('Failed to create personal post.')
        res.status(500).json(err)
    }
})

router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {include: [User, {model: Comment, include: [User]}]})
        const post = postData.get({plain: true})
        console.log('Here I am!', post)
        if (postData) {
        res.render('post', {post, loggedin: req.session.logged_in})
        } else {
            res.status(404).end()
        }
    } catch (err) {
        console.log('Failed to retrieve post.')
        res.status(404).json(err)
    }
})

module.exports = router;