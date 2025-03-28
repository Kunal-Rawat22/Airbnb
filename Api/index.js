require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);
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

const connectDB = require("./config/db");

const {
  userLogin,
  userRegister,
  userLogout,
  checkProfile,
  updateUser,
} = require("./controllers/userController");

const {
  createPlace,
  getAllPlaces,
  getPlaceById,
  getAllPlacesByOwnerId,
  updatePlace,
} = require("./controllers/placesController");

const {
  getWishlistPlace,
  updateWishlist,
} = require("./controllers/wishlistController");

const {
  getBookingById,
  getAllBookings,
} = require("./controllers/bookingController");

const { getGenerativeModel } = require("./controllers/aiLLMController");
const { createBooking } = require("./controllers/paymentController");

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
connectDB();

//Backend Routing

//User Register Route
app.post("/register", userRegister);

//Login Route
app.post("/login", userLogin);

//Logout Route
app.get("/logout", userLogout);

//Refresh Route
app.get("/profile", checkProfile);

//Update User
app.put("/updateProfile", updateUser);

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
app.post("/places", createPlace);

app.get("/places", getAllPlacesByOwnerId);

app.get("/places/:id", getPlaceById);

app.put("/places/:id", updatePlace);

app.get("/all-places", getAllPlaces);

app.listen(4000, (req, res) => {
  console.log("Server Running on Port 4000");
});
app.post("/api/getTripPlan", getGenerativeModel);
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

app.post("/payment/success", createBooking);
// token.user_id
// booking.search(userId)

app.get("/bookings", getAllBookings);

app.get("/booking/:id", getBookingById);

app.put("/places/wishlist/:id", updateWishlist);

app.get("/places/wishlist/:id", getWishlistPlace);
// booking =[]
// app.post("/booking/:id")
// booking.add({user})
