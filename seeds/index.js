const sequelize = require('../config/config');
const { User, Hand, Log } = require('../models');

const userSeedData = require('./userSeedData.json');
const logSeedData = require('./logSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData);

  for (const { id } of users) {
    const newUser = await User.create({
      user_id: id,
    });
  }

  for (const log of logSeedData) {
    const newlog = await Log.create({
      log_id: id,
    });
  }

  process.exit(0);
};

seedDatabase();
