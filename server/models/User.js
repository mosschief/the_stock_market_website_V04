const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true,
      bcrypt: true
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    }
  }
)

UserSchema.plugin(bcrypt);
module.exports = exports = mongoose.model('User', UserSchema);