const router = require('express').Router();

const userRoutes = require('./userRoute.js');
const actionRoutes = require('./actionRoutes.js');

router.use('/user', userRoutes);
router.use('/action', actionRoutes);

module.exports = router;
