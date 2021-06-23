const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        };

        newUser.password = await bcrypt.hash(req.body.password, 10);

        const userData = await User.create(newUser);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res.status(400).json({
                message: 'Incorrect email address, please try again!',
            });

            return;
        }

        const isValidPassword = await userData.checkPassword(req.body.password);

        if (!isValidPassword) {
            res.status(400).json({
                message: 'Incorrect password, please try again!',
            });

            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({
                user: userData,
                message: 'You are now logged in!',
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
