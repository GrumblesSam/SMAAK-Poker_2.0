const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Card extends Model {}

Card.init(
    {
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'card',
    }
);

module.exports = Card;