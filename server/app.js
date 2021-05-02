const express = require('express');
const session = require('express-session');
var passport = require('passport');
var routes = require('./routes');
const connection = require('./config/database');

var cors = require('cors');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();
app.enable('trust proxy')
app.use(cors(
    {
        origin: `${process.env.CLIENT}`,
        credentials: true
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStorage = new MongoStore({
    mongooseConnection: connection, collection: 'sessions'
});

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStorage,
    // for local testing use this
    // cookie: {
    //     maxAge: 1000 * 60 * 60 * 24 * 30 // set an expires header of 1 month
    // }
    // for DEPLOYEMENT USE THIS
    cookie: { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30, sameSite: 'none' }
}))

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require('./config/passport');   // takes the passport.use line
app.use(passport.initialize()); // initialize the passport middleware
app.use(passport.session());    // serrilize and deserialize user

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

app.listen(process.env.PORT, () => { console.log("server is listening") });