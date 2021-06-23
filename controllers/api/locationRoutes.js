const router = require('express').Router();
const { Location } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const locations = await Location.findAll();
        const locationData = locations.map(item => item.get({ plain: true }));

        res.status(200).json(locationData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newLocation = await Location.create({
            ...req.body,
        });

        res.status(200).json(newLocation);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const locationData = await Location.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!locationData) {
            res.status(404).json({ message: 'No locations found with this id!' });
            return;
        }

        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;