const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Reservation extends Model { }

Reservation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        cabin_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "cabin",
                key: "id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
        reservation_start: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        reservation_end: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "reservation",
    }
);

module.exports = Reservation;
