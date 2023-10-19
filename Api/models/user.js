const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String },
    mobileNo: { type: Number },
    email: { type: String, unique: true },
    password: { type: String },
    gender: { type: String },
    dob: { type: String },
    googleId: { type: String, default: null },
    facebookId: { type: String, default: null },
    appleId: { type: String, default: null },
    githubId: { type: String, default: null },
  },
  { timestamp: true }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
