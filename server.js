const express = require('express');
const exphb = require('express-handlebars');
const hbs = exphb.create({});
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config')

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sesh = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sesh))

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/routes'));

app.listen(PORT, () => {
    console.log('Server listening on  http://localhost:' + PORT);
    sequelize.sync({ force: false });
});