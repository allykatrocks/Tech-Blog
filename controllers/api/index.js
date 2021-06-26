const router = require('express').Router();
const userroutes = require('./userroutes');
const postroutes = require('./postroutes');
const commentroutes = require('./commentroutes');

router.use('/users', userroutes);
router.use('/posts', postroutes);
router.use('/comment', commentroutes);

module.exports = router;