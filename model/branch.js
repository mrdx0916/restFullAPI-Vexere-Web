const mongoose = require("mongoose");
const branchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    hotline: Number,
    code: {
        type: String,
        unique: String
    },
    status: {
        type: Boolean,
        default: true,
    }
},
    {
        timestamps: true
    }
)
const Branch = mongoose.model("Branch", branchSchema)
module.exports = Branch