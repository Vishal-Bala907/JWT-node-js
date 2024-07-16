const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
