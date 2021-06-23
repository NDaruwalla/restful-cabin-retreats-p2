const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Image extends Model { }

Image.init(
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
        src: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "image",
    }
);

module.exports = Image;
