const express = require('express');

const router = express.Router();
const User = require('../../../models/User');
const Stock = require('../../../models/Stock');
const iex = require('./iex_helper');

/**
 * Description: Add a stock to a users portfolio
 * params: {string} tickerSymbol and number of shares
 * return: newly added stock
 */
router.post('/add/:symbol', async (req, res, next) => {
  const iex_response = await iex.getCompanyInfo(req.params.symbol);

  // Parse response and find relevant data
  const newStock = {
    tickerSymbol: iex_response.quote.symbol,
    company: iex_response.quote.companyName,
    currentValue: iex_response.quote.latestPrice,
    shares: req.body.shares,
  };

  const stock = await User.findOne({
    _id: req.user._id,
    stocks: { $elemMatch: { tickerSymbol: newStock.tickerSymbol } },
  });

  // User does not already have stock so add it to their portfolio
  if (!stock) {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { stocks: newStock } });
      res.json(newStock);
    } catch (err) {
      res.json({ error: 'Error adding stock to portfolio' });
    }
  } else {
    // User already has the stock so send an error
    res.json({ error: 'Error: You already own that stock' });
  }
});

/**
 * Description: Remove a stock from a users portfolio
 * params: {string} tickerSymbol
 * return: updated user portfolio
 */
router.post('/delete/:symbol', async (req, res, next) => {
  const change = await User.update(
    { _id: req.user._id },
    { $pull: { stocks: { tickerSymbol: req.params.symbol } } },
  );

  if (change.nModified > 0) {
    res.json(req.user);
  } else {
    res.json({ error: 'User does not have that stock' });
  }
});

module.exports = router;
