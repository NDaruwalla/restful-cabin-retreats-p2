// import models
const User = require('./User');
const Reservation = require('./Reservation');
const Cabin = require('./Cabin');
const Location = require('./Location');
const Image = require("./Image")

User.hasMany(Reservation, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Reservation.belongsTo(User, {
    foreignKey: 'user_id'
});

Reservation.belongsTo(Cabin, {
    foreignKey: 'cabin_id'
});

Cabin.hasMany(Reservation, {
    foreignKey: 'cabin_id',
    onDelete: 'CASCADE'
});

Cabin.belongsTo(Location, {
    foreignKey: 'location_id'
});

Location.hasMany(Cabin, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
});

Cabin.hasMany(Image, {
    foreignKey: 'cabin_id',
    onDelete: 'CASCADE'
});

Image.belongsTo(Cabin, {
    foreignKey: 'cabin_id'
});

module.exports = { User, Reservation, Cabin, Location, Image };