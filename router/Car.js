const express = require("express");
const router = express.Router();
const { postCar, getCar } = require("../controller/Car");

router.post("/car", postCar);
router.get("/car", getCar);

module.exports = router;