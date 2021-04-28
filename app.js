const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');

var cors = require('cors');

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require('connect-mongo')(session);

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Create the Express application
var app = express();

app.use(cors());

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
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 30 // set an expires header of 1 month
    }
}))

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
require('./config/passport');   // takes the passport.use line
app.use(passport.initialize()); // initialize the passport middleware
app.use(passport.session());    // serrilize and deserialize user


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(5000,()=>{console.log("server is listening at 5000")});