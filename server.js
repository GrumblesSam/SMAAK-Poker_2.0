const path = require('path');
const express = require('express');
const session = require('express-session');
const {User} = require('./models');
const helpers = require('./utils/helpers');

const app = express();

const PORT = process.env.PORT || 3001;
 const sequelize = require('./config/config');
 const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

 app.use(session(sess));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
