const router = require('express').Router();
const {Post, Comment, User} = require('../models');

//this route is /api/user/
router.post('/', async (req, res) => {
    try {
    const userData = await User.create(req.body);
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//this route is /api/user/login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email: req.body.email}});
    
    if (!userData) {
        res
        .status(400)
        .json({message: 'Incorrect username or password. Please try again.'});
        return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
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