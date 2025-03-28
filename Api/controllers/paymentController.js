const Booking = require("../models/booking");
const User = require("../models/user");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";
const jwt = require("jsonwebtoken");

exports.createBooking = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { email, id } = user;
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const currDate = `${day} ${month} ${year}`;
      // const {  } = req.query;
      const {
        checkIn,
        checkOut,
        startDate,
        startMonth,
        endDate,
        endMonth,
        noOfDays,
        noOfGuests,
        payment_id,
        placeId,
        amount,
        address,
        title,
        photos,
        price,
        description,
      } = req.body;
    //   console.log("pyment _id %s", payment_id);
      try {
        const { userName, mobileNo, _id } = await User.findById(id);
        const bookingDoc = await Booking.create({
          userId: _id,
          mobileNo,
          email: email.toLowerCase(),
          userName,
          paymentId: payment_id,
          bookedDate: currDate,
          noOfGuests,
          checkIn,
          checkOut,
          placeId,
          noOfDays,
          placeName: title,
          price,
          photos,
          amount,
          description,
        });
        res.status(200).json(bookingDoc);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
};
