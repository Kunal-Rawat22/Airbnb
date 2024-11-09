const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userName: { type: String },
    mobileNo: { type: Number },
    email: { type: String, unique: true },
    paymentID: { type: String },
    checkIn: { type: String },
    checkOut: { type: String },
    bookedDate: { type: String },
    noOfGuests: { type: Number },
  },
  { timestamp: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;