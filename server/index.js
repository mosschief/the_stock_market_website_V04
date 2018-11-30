// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('./passport');

// Import credentials
const db_creds = require('./credentials/db_credentials');
const secret = require('./credentials/jwt_secret');

// Import routes
const auth = require('./api/auth');
const user = require('./api/user');

// Connect to mlab db
mongoose.connect(`mongodb://${db_creds.username}:${db_creds.password}@ds131763.mlab.com:31763/stk_db`);

const server = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Use authentication
server.use('/auth', auth);
server.use('/user', passport.authenticate('jwt', { session: false }), user);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  server.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

let connection = server.listen(port);

function stop() {
	connection.close()
}

module.exports = server;
module.exports.stop = stop;
