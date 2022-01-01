const mongoose = require("mongoose");

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
  encGoogleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true,
    default: ""
  },
  firstName: {
    type: String,
    required: true,
    default: ""
  },
  lastName: {
    type: String,
    required: true,
    default: ""
  },
  imgURL: {
    type: String,
    required: true,
    default: ""
  },
  ivString: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
