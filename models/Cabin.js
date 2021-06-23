const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cabin extends Model { }

Cabin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        occupancy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "location",
                key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "cabin",
    }
);

module.exports = Cabin;
