const express = require("express");
const {
  getBookingById,
  getAllBookings,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/bookings", getAllBookings);
router.get("/booking/:id", getBookingById);

module.exports = router;

