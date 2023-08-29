require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const cookieParser = require("cookie-parser");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";


app.use(express.json());
app.use(cookieParser())
//Cors Connection
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//MonogoDb Connection
async function main() {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.MONGODB_URL, connectionOptions);
    console.log(`Connected to MongoDB`);
  } catch (err) {
    console.log(`Couldn't connect: ${err}`);
  }
}

main();

//Backend Routing

//User Register Route
app.post("/register", async (req, res) => {
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
});

//Login Route
app.post("/login", async (req, res) => {
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
});

//Refresh Route
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token)
  {
    jwt.verify(token, jwtSecret, {},async (err, user) => {
      if (err) throw err;
      const { userName, mobileNo, email, gender, dob, _id } = await User.findById(user.id)
      const userDoc = { userName, mobileNo, email, gender, dob, _id };
      console.log(userDoc)
      res.json(userDoc);
    })
  }
  else
  {
    res.json(null);
    }
});

app.listen(4000, (req, res) => {
  console.log("Server Running on Port 4000");
});
