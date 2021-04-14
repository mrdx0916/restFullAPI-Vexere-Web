const express = require("express");
const router = express.Router();
const { postBranch, getBranch } = require("../controller/Branch");
router.post("/branch", postBranch);
router.get("/branch", getBranch);

module.exports = router;