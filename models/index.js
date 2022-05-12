const User = require('./user');
const Hand = require('./Hand');
const Log = require('./Log');
const Card = require('./Card');

User.hasOne(Hand, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Hand.belongsTo(User, {
    foreignKey: 'user_id',
});

Log.hasMany(Hand, {
    foreignKey: 'hand_id',
    onDelete: 'CASCADE',
});

// Hand.hasMany(Card, {
//     foreignKey: 'card_id',
//     onDelete: 'CASCADE',
// });
// Log.hasMany(User, {
//     foreignKey: 'user_id',
//     onDelete: 'CASCADE',
// });

// User.belongsTo(Log, {
//     foreignKey: 'user_id',
// });

// Hand.belongsTo(Log, {
//     foreignKey: 'hand_id',
// });


module.exports = { User, Hand, Log, Card };
