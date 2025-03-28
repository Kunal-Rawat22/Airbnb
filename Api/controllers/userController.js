const User = require("../models/user");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const cookieParser = require("cookie-parser");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).status(200).json(user);
          }
        );
      } else {
        res.status(401).json("Pass Failed");
      }
    } else {
      res.status(404).json("User Not Found");
    }
  } catch {}
};

exports.userRegister = async (req, res) => {
  const { userName, mobileNo, email, password, gender, dob } = req.body;

  try {
    const userDoc = await User.create({
      userName,
      mobileNo,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, bcryptSalt),
      gender,
      dob,
    });
    res.status(200).json(userDoc);
  } catch (err) {
    res.status(422).json(err);
  }
};

exports.userLogout = (req, res) => {
  res.clearCookie("session"); // Clear the session cookie
  res.clearCookie("session.sig");
  res.clearCookie("token");
  res.status(200).json("Logout Out");
};

exports.checkProfile = async (req, res) => {
  const { token } = req.cookies;
  const { passport } = req.session;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { userName, mobileNo, email, gender, dob, _id } =
        await User.findById(user.id);
      //   console.log(dob);
      var year = dob?.split("-")[0];
      var month = dob?.split("-")[1];
      var day = dob?.split("-")[2];
      let date = `${year}-${month}-${day}`;
      const userDoc = {
        userName,
        mobileNo,
        email,
        gender,
        dob: date,
        _id,
      };
      //   console.log(userDoc);
      res.json(userDoc);
    });
  } else if (passport) {
    const { user } = passport;
    try {
      const userDoc = await User.findOne({ email: user.email });
      if (userDoc) {
        // console.log("bhbhbhbhb", userDoc);
        const obj = { ...userDoc._doc, ...user };
        const newDoc = await User.updateOne({ email: user.email }, { ...obj });
        // console.log("uyibhbib", obj);
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).status(200).json(obj);
          }
        );
      } else {
        const userDoc = await User.create(user);
        res.status(200).json(userDoc);
      }
    } catch (e) {
      res.status(422).json(e);
    }
  } else {
    res.json(null);
  }
};

exports.updateUser = (req, res) => {
  const { token } = req.cookies;
  const updatedData = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      try {
        User.findByIdAndUpdate(user.id, updatedData).then((updatedUser) => {
          if (updatedUser) res.status(200).json(updatedUser);
        });
      } catch (e) {
        res.status(422).json(err);
      }
    });
  } else {
    res.json(null);
  }
};
