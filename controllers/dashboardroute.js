const router = require('express').Router();
const {Post, Comment, User} = require('../models');
const withAuth = require('../utils/auth')
//this route is /dashboard/
router.get('/', withAuth, async (req, res) => {
    try {
        const userposts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{model: User, attributes: ['username']}, {model: Comment, include: [{model: User, attributes: ['username']}]}]
        })
        const myposts = userposts.map(post => post.get({plain: true}))
        console.log(myposts)
        res.render("myposts", {
            layout: "dashboard",
            myposts
          });
  
    }  catch(err) {
        res.status(500).json(err)
    }
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        if (postData) {
            const post = postData.get({plain: true})
            res.render('editpost', {
                layout: 'dashboard',
                post
            })
        } else {
            res.status(404).end()
        }

    } catch (err) {
        console.log('Failed to find personal post. Line 39')
        res.redirect('login')
    }
})

router.get('/new', async (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    })
})
module.exports = router;