const express = require("express")
const router = express.Router();
const { UserSignIn, UserSignUp } = require("../controller/User");
router.post("/signin", UserSignIn);
router.post("/signup", UserSignUp);
module.exports = router;