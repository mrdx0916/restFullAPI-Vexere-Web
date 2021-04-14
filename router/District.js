const express = require("express");
const router = express.Router();
const { postDistrict, getDistrict } = require("../controller/District");
router.post("/district", postDistrict);
router.get("/district", getDistrict);

module.exports = router