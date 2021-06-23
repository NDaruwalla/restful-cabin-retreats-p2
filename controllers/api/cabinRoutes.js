const router = require('express').Router();
const { Cabin } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const cabins = await Cabin.findAll();
        const cabinData = cabins.map(item => item.get({ plain: true }));

        res.status(200).json(cabinData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newCabin = await Cabin.create({
            ...req.body,
        });

        res.status(200).json(newCabin);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const cabinData = await Cabin.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!cabinData) {
            res.status(404).json({ message: 'No cabins found with this id!' });
            return;
        }

        res.status(200).json(cabinData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;