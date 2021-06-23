const router = require('express').Router();
const { Reservation, Cabin, Image, Location } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/', withAuth, async (req, res) => {
    try {
        const reservationData = await Reservation.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: {
                exclude: [
                    'user_id',
                ],
            },
            include: {
                model: Cabin,
                attributes: {
                    exclude: [
                        'location_id',
                    ],
                },
                include: [
                    {
                        model: Image,
                        limit: 1,
                        attributes: [
                            'src',
                        ],
                    },
                    {
                        model: Location,
                    },
                ],
            },
        });

        const reservations = reservationData.map(reservation => reservation.get({ plain: true }));

        res.render('dashboard-page', {
            reservations: reservations,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
