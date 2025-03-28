const express = require("express");
const {
  createPlace,
  getAllPlaces,
  getPlaceById,
  getAllPlacesByOwnerId,
  updatePlace,
} = require("../controllers/placesController");

const router = express.Router();

//posting data from places form
router.post("/places", createPlace);

router.get("/places", getAllPlacesByOwnerId);

router.get("/places/:id", getPlaceById);

router.put("/places/:id", updatePlace);

router.get("/all-places", getAllPlaces);

module.exports = router;