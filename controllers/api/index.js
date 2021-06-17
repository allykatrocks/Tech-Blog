const router = require('express').Router();
const userroutes = require('./userroutes');
const postroutes = require('./postroutes');

router.use('/user', userroutes);
router.use('/posts', postroutes);

module.exports = router;