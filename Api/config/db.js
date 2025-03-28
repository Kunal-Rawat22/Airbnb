require("dotenv").config();
const mongoose = require("mongoose");

//MongoDb Connection
async function connectDB() {
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


module.exports = connectDB;