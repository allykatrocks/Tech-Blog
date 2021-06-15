const router = require('express').Router();
const {Post, Comment, User} = require('../models');

router.get('/', async (req, res) => {
    try {
        const postdata = await Post.findAll({
            include: [{model: User, attributes: ['username']}, {model: Comment, include: [{model: User, attributes: ['username']}]}]
        })
        const posts = postdata.map(post => post.get({plain: true}))
        console.log(posts);
        res.render('all', {posts});
    } catch(err) {
        res.status(500).json(err)
    }
    
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
})

module.exports = router;