const { User } = require("../model/User");
const sendEmail = require("../router/mailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const UserSignUp = async (req, res) => {
    const { username, name, password, email, phone } = req.body;
    try {
        const foundedUser = await User.findOne().or([{ username }, { email }]);
        if (foundedUser) res.status(400).send({ message: "user already exist" });
        const newUser = new User({
            username, name, password, email, phone
        })
        let result = await newUser.save()
        result = result.toObject();
        delete result.password
        await sendEmail(email);
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: " something went wrong" })
    }

}
const UserSignIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const foundedUser = await User.findOne({ username });
        if (!foundedUser) {
            return status(401).send({ message: "username does not exist" })
        }
        const isMatch = await bcrypt.compare(password, foundedUser.password)
        if (!isMatch) {
            return res.status(401).send("password wrong")
        }
        const token = await jwt.sign(
            {
                _id: foundedUser._id,
            }, "jwtvexere"
        )
        foundedUser.tokens.push(token);
        await foundedUser.save();
        res.send(token);
    } catch (err) {
        console.log(err);
        res.status(550).send({ error: err })
    }

}
module.exports = { UserSignIn, UserSignUp }