const router = require('express').Router();
const homeRoutes = require('./homeRoute.js');
const apiRoutes = require('./api/');
router.use('/api', apiRoutes)
router.use('/', homeRoutes)
module.exports = router;
