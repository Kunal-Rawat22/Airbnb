const User = require("../models/user");
const Place = require("../models/places");
const Wishlist = require("../models/wishlist");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const cookieParser = require("cookie-parser");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";
const jwt = require("jsonwebtoken");

exports.createPlace = (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    photos,
    price,
    lat,
    long,
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const placeDoc = await Place.create({
          owner: user.id,
          title,
          address,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          photos,
          price,
          lat,
          long,
        });
        // console.log("success");
        res.json(placeDoc);
      } catch (e) {
        res.status(422).json(err);
      }
    });
  }
};

exports.getAllPlacesByOwnerId = (req, res) => {
  const { token } = req.cookies;
  //   console.log("first");
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { id } = user;
      res.json(await Place.find({ owner: id }));
    });
  }
};

exports.getPlaceById = async (req, res) => {
  const id = req.params.id;
  //   console.log(id);
  const result = res.json(await Place.find({ _id: id }));
};

exports.updatePlace = async (req, res) => {
  const { token } = req.cookies;
  const id = req.params.id;
  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    photos,
    price,
    lat,
    long,
  } = req.body;
  // console.log("price", price);
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const placeDoc = await Place.updateOne(
          { _id: id },
          {
            $set: {
              title: title,
              address: address,
              description: description,
              perks: perks,
              extraInfo: extraInfo,
              checkIn: checkIn,
              checkOut: checkOut,
              maxGuests: maxGuests,
              photos: photos,
              price: price,
              lat: lat,
              long: long,
            },
          }
        );
        // console.log("success");
        res.json(placeDoc);
      } catch (e) {
        res.status(422).json(err);
      }
    });
  }
};

exports.getAllPlaces = async (req, res) => {
  const result = await Place.find();
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const { id } = user;
        const { _id } = await User.findById(id);
        // console.log(_id);
        // console.log(result);
        const result2 = await Promise.all(
          result.map(async (element) => {
            const wishlistItem = await Wishlist.findOne({
              userId: _id,
              placeId: element._id,
            });
            // console.log(`###########${wishlistItem}`);
            return {
              ...element.toObject(),
              isWishlist: wishlistItem ? true : false,
            };
          })
        );
        // console.log("result");
        res.status(200).json(result2);
      } catch {
        res.status(422).json(err);
      }
    });
  } else {
    res.json(result);
  }
};

exports.deletePlace = async (req, res) => {
  console.log("vjvjhvjhvb");
  const id = req.params.id;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        const result = await Place.findByIdAndDelete(id);
        res.status(204).json(result);
        console.log("hgchgcgvjvjv");
      } catch {
        res.status(422).json(err);
      }
    });
  } else {
    console.log("bkjn,nlnmnnl");
    res.status(403).json("Not Authorized");
  }
};
