const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Log extends Model {}

Log.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        round: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hand_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'hand',
                key: 'id',
            },
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     reference: {
        //         model: 'user',
        //         key: 'user_id',
        //     },
        // },

    },
    {
        sequelize,
        freezeTableName: true,
        undersscored: true,
        modelName: 'log',
    }
);

module.exports = Log;