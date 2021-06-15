const router = require('express').Router();
const {Post, Comment, User} = require('../models');
//this route is /dashboard/
router.get('/', async (req, res) => {
    try {
        const userposts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{model: User, attributes: ['username']}, {model: Comment, include: [{model: User, attributes: ['username']}]}]
        })
        const myposts = userposts.map(post => post.get({plain: true}))
        res.render('dashboard', {myposts});
    }  catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;