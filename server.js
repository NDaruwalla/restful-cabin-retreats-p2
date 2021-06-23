const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// initializing an express app
const app = express();
const PORT = process.env.PORT || 3001;

//sequelize session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// middleware to use so that http request will work smoothly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define handlebar
const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'base',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    helpers: helpers,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// defines the location of where to get static files
app.use(express.static(path.join(__dirname, 'public')));

// express app, use these route from my routes folder
app.use(routes);

// start listening to http request
sequelize
    .sync({
        force: false,
    })
    .then(() => {
        app.listen(PORT, () => console.log('Now listening'));
    });
