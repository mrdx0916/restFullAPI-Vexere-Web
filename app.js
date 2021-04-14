const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
require("./db/connect");
const path = require("path");
const passport = require("passport");
const facebookStrategy = require("passport-facebook-token")
const imagesFolderPath = path.join(__dirname, "images");
const { User } = require("./model/User")
const app = express();
passport.use("facebooktoken", new facebookStrategy(
    {
        clientID: "491562088506994",
        clientSecret: "632673bb14ff808eb2290775f9945e65"
    }, async (accessToken, refreshToken, profile, done) => {
        const userEmail = profile.emails[0].value;
        const userAvatar = profile.photos[0].value;
        const foundedUser = await User.findOne({ user: userEmail });
        let user = foundedUser
        if (!foundedUser) {
            const newuser = new User({
                email: userEmail,
                avatar: userAvatar,
            })
            user = await newuser.save();
        }
        done(null, user);
    }
))
const provinceRouter = require("./router/Province")
const userRouter = require("./router/User");
const uploadRouter = require("./router/upload")
const districtRouter = require("./router/District")
const carRouter = require("./router/Car")
const branchRouter = require("./router/Branch")
const tripRouter = require("./router/Trip");
const ticKetRouter = require("./router/Ticket");

app.use(bodyParser.json());
app.use("/images", express.static(imagesFolderPath))
app.use(provinceRouter);
app.use(userRouter);
app.use(uploadRouter)
app.use(districtRouter);
app.use(carRouter);
app.use(branchRouter);
app.use(tripRouter);
app.use(ticKetRouter)
app.post("/facebook/login", passport.authenticate("facebookToken", { session: false }),
    async (req, res) => {
        const token = await jwt.sign(
            {
                _id: req.user._id
            },
            "jwtvexere"

        )
        req.user.tokens.push(token);
        await req.user.save();
        res.send(token)
    }
);
app.listen(3000, () => {
    console.log("listenning.....................")
})