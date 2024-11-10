const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
    userName: { type: String },
    mobileNo: { type: Number },
    email: { type: String },
    paymentId: { type: String, unique: true },
    checkIn: { type: String },
    checkOut: { type: String },
    bookedDate: { type: String },
    noOfGuests: { type: Number },
  },
  { timestamp: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;