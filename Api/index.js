require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Place = require("./models/places");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
//Cors Connection
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//MongoDb Connection
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

//Logout Route
app.get("/logout", (req, res) => {
  res.cookie("token", "").status(200).json("Logout Out");
});

//Refresh Route
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { userName, mobileNo, email, gender, dob, _id } =
        await User.findById(user.id);
      var year = dob.getFullYear();
      var month = dob.getMonth() + 1; // Adding 1 because months are zero-based
      var day = dob.getDate();
      let date = `${year}-${month}-${day}`;
      const userDoc = {
        userName,
        mobileNo,
        email,
        gender,
        dob: date,
        _id,
      };
      console.log(userDoc);
      res.json(userDoc);
    });
  } else {
    res.json(null);
  }
});

//Update User
app.put("/updateProfile", (req, res) => {
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
});

//Upload Photos By Link
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  console.log(link);
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

//Upload by Device
const photoMiddleware = multer({ dest: "uploads" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
    console.log(req.files);
  }
  res.json(uploadedFiles);
});

//posting data from places form
app.post("/places", (req, res) => {
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
        });
        console.log("success");
        res.json(placeDoc);
      } catch (e) {
        res.status(422).json(err);
      }
    });
  }
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;
  console.log("first");
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { id } = user;
      res.json(await Place.find({ owner: id }));
    });
  }
});

app.get("/places/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = res.json(await Place.find({ _id: id }));
});

app.put("/places/:id", async (req, res) => {
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
  } = req.body;
  console.log("price",price);
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
            },
          }
        );
        console.log("success");
        res.json(placeDoc);
      } catch (e) {
        res.status(422).json(err);
      }
    });
  }
});

app.get("/all-places", async (req, res) => {
  const result = res.json(await Place.find());
});
app.listen(4000, (req, res) => {
  console.log("Server Running on Port 4000");
});
