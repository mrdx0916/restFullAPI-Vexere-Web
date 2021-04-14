const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: "client",
    },
    tokens: {
        type: [String],
        default: [],
    },
    avatar: {
        type: String,
        default: "",
    },
    status:
    {
        type: Boolean,
        default: true,
    }
},
    {
        timestamp: true,
    }
);
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;
    return user;
}
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
});
const User = mongoose.model("User", userSchema)
module.exports = {
    User, userSchema
}