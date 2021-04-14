const express = require("express");
const router = express.Router();
const auth = require("../helper/auth")
const getTicket = require("../controller/Ticket");
router.get("/ticket", auth(), getTicket);
module.exports = router