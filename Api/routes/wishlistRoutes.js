const express = require("express");

const {
  getWishlistPlace,
  updateWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.put("/places/wishlist/:id", updateWishlist);
router.get("/places/wishlist/:id", getWishlistPlace);

module.exports = router;
