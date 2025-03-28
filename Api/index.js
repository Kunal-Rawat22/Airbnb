require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Place = require("./models/places");
const Booking = require("./models/booking");
const Wishlist = require("./models/wishlist");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const jwtSecret = "srvfbi298y8240u1$&&@X!H@!@!(";
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./models/Passport");
const authRoute = require("./routes/auth");
const session = require("express-session");

app.use(express.json());
app.use(cookieParser());

//Cookie Session
app.use(
  cookieSession({
    name: "session",
    keys: ["YatraNest"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(
  session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/auth", authRoute);
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
  res.clearCookie("session"); // Clear the session cookie
  res.clearCookie("session.sig");
  res.clearCookie("token");
  res.status(200).json("Logout Out");
});

//Refresh Route
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  const { passport } = req.session;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
      const { userName, mobileNo, email, gender, dob, _id } =
        await User.findById(user.id);
      console.log(dob);
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
      console.log(userDoc);
      res.json(userDoc);
    });
  } else if (passport) {
    const { user } = passport;
    try {
      const userDoc = await User.findOne({ email: user.email });
      if (userDoc) {
        console.log("bhbhbhbhb", userDoc);
        const obj = { ...userDoc._doc, ...user };
        const newDoc = await User.updateOne({ email: user.email }, { ...obj });
        console.log("uyibhbib", obj);
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
  console.log("price", price);
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
// const axios = require("axios");
// const OpenAI = require("openai")

// const openai = new OpenAI({
//   organization: "org-3BxyTI7IvbLjYsCFOGDEnVLT",
//   project: "proj_zQcyMAhSH9C0zQanNEpgZcuE",
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Example function to fetch a trip plan
// const fetchTripPlan = async (place, days) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "user", content: `Plan a trip to ${place} for ${days} days.` },
//       ],
//       headers: {
//         "OpenAI-Organization": process.env.OPENAI_ORGANIZATION_ID, // Add organization ID here if needed
//       },
//     });

//     const tripPlan = response.choices[0].message.content;
//     return tripPlan;
//   } catch (error) {
//     console.error("Error fetching trip plan:", {
//       message: error.message,
//       stack: error.stack,
//       response: error.response ? error.response.data : null,
//     });
//     throw error;
//   }
// };
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parse } = require("path");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const AImodel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.post("/api/getTripPlan", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ tripPlan: "Place and number of days are required." });
  }

  try {
    // const result = await AImodel.generateContent(`Plan a trip to ${place} for ${days} days. only list places to visit and city along with it no details only places name and city location name comma loaction and no hashes and stars only list using numbers as bullets`);
    // const tripPlan = await fetchTripPlan(place, days);
    const result = await AImodel.generateContent(prompt);
    const text = result.response.text();
    console.log(`##################${text}`);
    res.json(JSON.parse(text.replace(/```json|```/g, "").trim()));
    // const match = text.match(/const obj = (\[.*\]);/s);

    // if (match && match[1]) {
    //   // Escape single quotes inside string values
    //   const sanitizedText = match[1].replace(
    //     /'([^']*?)'/g,
    //     (m, p1) => `'${p1.replace(/'/g, "\\'")}'`
    //   );

    //   // Use eval after sanitizing
    //   const objArray = eval(`(${sanitizedText})`);
    //   res.json(objArray);
    // } else {
    //   res.json("Sorry Gemini AI is down as of now")
    //   console.log("Object not found in text.");
    // }
  } catch (error) {
    console.error("Error communicating with AI:", error);
    res.status(500).json({ text: "Failed to get a trip plan." });
  }
});

app.post("/api/location", (req, res) => {
  const { lat, lon } = req.body;

  // Here, you can handle the location data, e.g., save it to a database
  console.log(`Received location: Latitude ${lat}, Longitude ${lon}`);

  // Respond with success
  res.json({
    message: "Location received successfully",
    Lat: lat,
    Long: lon,
  });
});

app.post("/payment/success", async (req, res) => {
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
      console.log("pyment _id %s", payment_id);
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
});
// token.user_id
// booking.search(userId)

app.get("/bookings", async (req, res) => {
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
        const result2 = await Place.find({});
        res.json(result);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
});

app.get("/booking/:id", (req, res) => {
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
        console.log(result);
        res.json(result);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
});

app.put("/places/wishlist/:id", async (req, res) => {
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
        console.log(result);
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
});

app.get("/places/wishlist/:id", async (req, res) => {
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
        console.log(result);
        if (result == null) res.status(201).json(false);
        else res.status(200).json(true);
      } catch (err) {
        res.status(422).json(err);
      }
    });
  }
});
// booking =[]
// app.post("/booking/:id")
// booking.add({user})
