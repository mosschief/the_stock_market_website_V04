const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../../credentials/jwt_secret');
const User = require('../../models/User');
const stocks = require('./stocks');

// Use stocks routes
router.use('/stocks', stocks);

router.get('/', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
