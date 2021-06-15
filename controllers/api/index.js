const router = require('express').Router();
const userroutes = require('./userroutes');

router.use('/user', userroutes);
router.use('/posts', postrouts);

module.exports = router;