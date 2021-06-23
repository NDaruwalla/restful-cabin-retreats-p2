const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require("./api");
const cabinRoutes = require('./cabinRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/cabins', cabinRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
