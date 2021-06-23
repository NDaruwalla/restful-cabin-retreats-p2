const sequelize = require('../config/connection');
const { User, Reservation, Cabin, Location, Image } = require('../models');

const locationData = require('./locationData.json');
const userData = require('./userData.json');
const cabinData = require('./cabinData.json');
const reservationData = require('./reservationData.json');
const imageData = require('./imageData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const locations = await Location.bulkCreate(locationData);
    const users = await User.bulkCreate(userData);
    const cabins = await Cabin.bulkCreate(cabinData);
    const reservations = await Reservation.bulkCreate(reservationData);
    const images = await Image.bulkCreate(imageData);

    process.exit(0);
};

seedDatabase();
