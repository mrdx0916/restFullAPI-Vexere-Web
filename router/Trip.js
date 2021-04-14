const express = require("express");
const auth = require("../helper/auth")
const router = express.Router();
const { postTrip, postBookTrip } = require("../controller/Trip");
router.post("/trip", postTrip);
router.post("/trip/booking", auth(), postBookTrip)
module.exports = router;
