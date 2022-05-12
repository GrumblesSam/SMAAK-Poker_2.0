const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Hand extends Model {}

Hand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // hand_id: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'log',
        //         key: 'hand_id',
        //     },
        // },
        hand_val: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key: 'user_id',
            },
        },
        card_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'card',
                key: 'card_id',
            },
        },

    },
    {
        sequelize,
        freezeTableName: true,
        undersscored: true,
        modelName: 'hand',
    }
);

module.exports = Hand;