
const express = require("express");
const router = express.Router();
const { postProvice, getProvince, putProvince } = require("../controller/Province");
router.post("/province", postProvice);
router.get("/province", getProvince)
router.put("/province", putProvince)
module.exports = router