const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      bcrypt: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    stocks: [{
      tickerSymbol: {
        type: String,
        required: true,
        unique: true,
      },

      company: {
        type: String,
        required: true,
      },

      currentValue: {
        type: Number,
        required: true,
      },

      shares: {
        type: Number,
        required: true,
      },

      dateAdded: {
        type: Date,
        default: Date.now,
      },
    }],
  },
);

UserSchema.plugin(bcrypt);
module.exports = exports = mongoose.model('User', UserSchema);
