const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../../credentials/jwt_secret');
const User = require('../../models/User');
const Stock = require('../../models/User');

/**
 * Description: Handles login by checking user/password combination
 * params: email, password
 * return: jwt token
 * */
router.post('/login', async (req, res, next) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  const user = await User.findOne({ email });

  if (!user) {
    res.json({ error: 'Incorrect email or password.' });
  }

  // Compare password sent in and password stored in db
  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    res.json({ error: 'Incorrect email or password.' });
  }

  const token = await jwt.sign({ id: user.id }, secret, { expiresIn: '1y' });
  res.json({ 'auth-token': token });
});

/**
 * Description: Handles signup
 * params: email, password, firstName, lastName
 * return: new User
 * */
router.post('/signup', async (req, res, next) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  const user = await User.findOne({ email: newUser.email });

  // Didn't find user with that email
  if (!user) {
    new User(newUser).save()
      .then(user => res.json(user))
      .catch(err => res.json({ error: 'Error creating user' }));
  } else {
    // Found user with the email, so return an error message
    res.json({ error: 'Error: Already a user with that email' });
  }
});

module.exports = router;
