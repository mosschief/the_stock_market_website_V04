//Import dependencies
const express =  require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const passport = require("passport");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('./passport');

//Import credentials
const db_credentials = require('./credentials/db_credentials'),
      db_creds = require('./credentials/db_credentials');
const secret = require('./credentials/jwt_secret');

//Import routes
const auth = require('./api/auth');
const user = require('./api/user');

//Connect to mlab db
mongoose.connect(`mongodb://${db_creds.username}:${db_creds.password}@ds131763.mlab.com:31763/stk_db`);

// ## This is a template for connecting to sequelize

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: '',
//   dialect: 'postgres',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },

// });

const server = express();

//Bodyparser middleware
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json());

//Use authentication
server.use('/auth', auth);
server.use('/user', passport.authenticate('jwt', { session: false }), user);

server.listen(3000);