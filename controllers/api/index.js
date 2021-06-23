const router = require('express').Router();

const userRoutes = require('./userRoutes');
// const locationRoutes = require('./locationRoutes');
// const cabinRoutes = require('./cabinRoutes');
const reservationRoutes = require('./reservationRoutes');

router.use('/users', userRoutes);
// router.use('/locations', locationRoutes);
// router.use('/cabins', cabinRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;
