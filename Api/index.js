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
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const axios = require("axios");
// const mime = require("mime");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./models/passport");
const authRoute = require("./routes/auth");
const session = require("express-session");
const connectDB = require("./config/db");

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

//Cors Connection
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//MongoDb Connection
connectDB();

//AWS S3 Connection
const client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_2,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_2,
  },
});

//Backend Routing
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/auth", authRoute);
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/placesRoutes"));
app.use("/", require("./routes/genAIRoutes"));
app.use("/", require("./routes/paymentRoutes"));
app.use("/", require("./routes/wishlistRoutes"));
app.use("/", require("./routes/bookingRoutes"));
app.listen(4000, (req, res) => {
  console.log("Server Running on Port 4000");
});

// //Upload Photos By Link
// app.post("/upload-by-link", async (req, res) => {
//   const { link } = req.body;
//   console.log(link);
//   const newName = "photo" + Date.now() + ".jpg";
//   await imageDownloader.image({
//     url: link,
//     dest: __dirname + "/uploads/" + newName,
//   });
//   res.json(newName);
// });

// //Upload by Device
// const photoMiddleware = multer({ dest: "uploads" });
// app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace("uploads/", ""));
//     console.log(req.files);
//   }
//   res.json(uploadedFiles);
// });

//Upload Photos By Link
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;

  console.log(link);
  const response = await axios.head(link);
  const contentType = response.headers["content-type"] || "image/jpeg";

  const newName = "photo" + Date.now() + ".jpg";
  const tmpPath = `/tmp/${newName}`;

  await imageDownloader.image({
    url: link,
    dest: tmpPath,
  });
  const url = await uploadToS3(tmpPath, newName, contentType);
  res.json(url);
});

//Upload by Device
const photoMiddleware = multer({ dest: "tmp" });
app.post("/upload", photoMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    // const { path, originalname } = req.files[i];
    // const parts = originalname.split(".");
    // const ext = parts[parts.length - 1];
    // const newPath = path + "." + ext;
    // fs.renameSync(path, newPath);
    // uploadedFiles.push(newPath.replace("uploads/", ""));
    // console.log(req.files);
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

const bucket = "yatranest-bucket";

async function uploadToS3(path, originalFilename, mimetype) {
  try {
    const ext = originalFilename.split(".").pop();
    const newFilename = `${Date.now()}.${ext}`;
    const fileBuffer = await fs.promises.readFile(path);
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Body: fileBuffer,
        Key: newFilename,
        ContentType: mimetype,
      })
    );

    fs.unlink(path, (err) => {
      if (err) console.error(`Failed to delete temp file: ${err}`);
    });
    // console.log("gbehjkbj");
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Upload failed");
  }
  // console.log({path, originalFilename,newFilename, mimetype,ext});
}

app.delete("/photo/:id", async (req, res) => {
  try {
    const key = req.params.id; // Key is the file name in S3
    if (!key) return res.status(400).json({ error: "File key is required" });
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );
    res.json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    console.error("S3 Delete Error:", error);
    res.status(500).json({ error: "Failed to delete photo" });
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

// token.user_id
// booking.search(userId)
// booking =[]
// app.post("/booking/:id")
// booking.add({user})
