const User = require("../models/user");
const Wishlist = require("../models/wishlist");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";
const jwt = require("jsonwebtoken");

exports.getWishlistPlace = async (req, res) => {
  const { token } = req.cookies;
  const placeId = req.params.id;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const { id } = user;
        const { _id } = await User.findById(id);
        const result = await Wishlist.findOne({
          userId: _id,
          placeId: placeId,
        });
        // console.log(result);
        if (result == null) res.status(201).json(false);
        else res.status(200).json(true);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
};

exports.updateWishlist = async (req, res) => {
  const { token } = req.cookies;
  const placeId = req.params.id;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const { id } = user;
        const { _id } = await User.findById(id);
        // console.log("##################");
        const result = await Wishlist.findOne({
          userId: _id,
          placeId: placeId,
        });
        // console.log("behjbfejhbkefbe###################fbjkebfhbef");
        // console.log(result);
        if (result == null) {
          // console.log("behjbfejhbkefbefbjkebfhbef");
          const result = await Wishlist.create({
            userId: _id,
            placeId: placeId,
          });
          res.status(201).json(true);
        } else {
          // console.log("behjbfejhbkefbefbjkwnflfnlnf3jnf3nkn3fnebfhbef");
          const result2 = await Wishlist.findByIdAndDelete(result._id);
          res.status(200).json(false);
        }
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
};
