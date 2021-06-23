const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Location extends Model { }

Location.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "location",
    }
);

module.exports = Location;
