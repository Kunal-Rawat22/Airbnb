const Booking = require("../models/booking");
const User = require("../models/user");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";
const jwt = require("jsonwebtoken");

exports.getAllBookings = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { email, id } = user;
      try {
        const { userName, mobileNo, _id } = await User.findById(id);
        const result = await Booking.find({ userId: _id });
        // console.log(_id);
        // console.log(result);
        // const result2 = await Place.find({});
        res.json(result);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
};

exports.getBookingById = (req, res) => {
  const { token } = req.cookies;
  const id = req.params.id;
  // console.log("object");
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      // console.log("shjvs");
      try {
        // console.log("Id%s",id);
        const result = await Booking.findById(id);
        // console.log(result);
        res.json(result);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
};
