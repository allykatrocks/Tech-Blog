const router = require('express').Router();
const homeroutes = require('./homeroutes');
const dashboardroute = require('./dashboardroute');
const api = require('./api');

router.use('/', homeroutes)
router.use('/dashboard', dashboardroute)
router.use('/api', api);

module.exports = router;