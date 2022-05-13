const path = require('path');
const express = require('express');
const session = require('express-session');
const {User} = require('./models');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
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
// app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
 app.use(session(sess));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 var assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use(require('./controllers/'));
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});