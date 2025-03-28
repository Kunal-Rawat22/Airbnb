const express = require("express");
const { getGenerativeModel } = require("../controllers/aiLLMController");

const router = express.Router();
router.post("/api/getTripPlan", getGenerativeModel);
module.exports = router;