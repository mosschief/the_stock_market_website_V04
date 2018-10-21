const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt');

const StockSchema = new Schema(
  {
    tickerSymbol: {
      type: String,
      required: true,
      unique: true
    },

    company: {
      type: String,
      required: true,
    },

    currentValue: {
      type: Number,
      required: true
    },

    dateAdded: {
      type: Date,
      default: Date.now
    }
  }
)

module.exports = exports = mongoose.model('Stock', StockSchema);