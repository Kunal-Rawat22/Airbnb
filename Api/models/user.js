const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String },
    mobileNo: { type: Number },
    email: { type: String, unique: true },
    password: { type: String },
    gender: { type: String },
    dob: { type: Date },
  },
  { timestamp: true }
);
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
