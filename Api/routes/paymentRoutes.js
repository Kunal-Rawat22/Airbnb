const express = require("express");
const { createBooking } = require("../controllers/paymentController");

const router = express.Router();
router.post("/payment/success", createBooking);
module.exports = router;