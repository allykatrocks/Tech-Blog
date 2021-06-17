const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const postroutes = require('./postroutes');

//this route is /api/user/
router.post('/', async (req, res) => {
    try {
    const userData = await User.create(req.body);
    
    req.session.save(()=>{
        req.session.user_id = userData.id;
        req.session.username = userData.username
        req.session.logged_in = true;

        res.status(200).json(userData);
    })
    } catch (err) {
        res.status(400).json(err);
    }
});

//this route is /api/user/login
router.post('/login', async (req, res) => {
    console.log("here line 19...........................................")
    try {
        const userData = await User.findOne({where: {username: req.body.username}});
    
    if (!userData) {
        res
        .status(400)
        .json({message: 'Incorrect username or password. Please try again.'});
        return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    console.log("line 29")
    if (!validPassword) {
        res
        .status(400)
        .json({message: 'Incorrect password. Try again.'});
        return;
    }

    
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({user: userData, message: 'You have been logged in!'});
    });
    } catch (err) {
        res.status(400).json(err);
    }
    
})

router.post('/logout', async (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router;