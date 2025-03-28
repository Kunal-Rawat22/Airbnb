const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  },
  { timestamp: true }
);

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);
module.exports = WishlistModel;
