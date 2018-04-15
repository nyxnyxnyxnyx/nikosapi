var router = require('express').Router();


// api router will mount other routers
// for all our resources
router.use('/users', require('./user/userRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/footwears', require('./footwear/footwearRoutes'));

module.exports = router;
