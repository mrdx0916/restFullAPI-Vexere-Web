const { User } = require("../model/User");
const jwt = require("jsonwebtoken");
const auth = (roles) => async (req, res, next) => {
    try {

        const token = req.header("Authorization").replace("Bearer ", "");

        const decode = await jwt.verify(token, "jwtvexere");
        // console.log(decode);
        const allowRoles = roles || ["admin", "client"]
        const foundedUser = await User.findOne({
            _id: decode._id,
            tokens: token,
            role: { $in: allowRoles },
        });
        // console.log(foundedUser);
        if (!foundedUser) {
            res.status(401).send({ message: " you aren't authorized" })
        }
        req.user = foundedUser;
        req.token = token;
        next();
    } catch (err) {
        console.log(err);
        res.status.send({ message: "you are not authorized", error: err })
    }
}
module.exports = auth;