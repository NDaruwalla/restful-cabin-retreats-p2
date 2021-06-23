const router = require('express').Router();
const { Cabin, Location, Image, Reservation } = require('../models');

router.get('/:id', async (req, res) => {
    try {
        const cabinData = await Cabin.findByPk(req.params.id, {
            include: [
                {
                    model: Location,
                    attributes: {
                        exclude: [
                            'id',
                        ],
                    },
                },
                {
                    model: Image,
                    attributes: [
                        'src',
                    ],
                },
                {
                    model: Reservation,
                    attributes: [
                        'reservation_start',
                        'reservation_end',
                    ],
                },
            ],
        });

        const cabin = cabinData.get({ plain: true });

        console.log(JSON.stringify(cabin.reservations));

        res.render('cabin-page', {
            cabin: cabin,
            reservations: JSON.stringify(cabin.reservations),
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
