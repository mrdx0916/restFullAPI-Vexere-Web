const mongoose = require("mongoose");
const stationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: String,
    code: {
        type: String,
        unique: true,
    },
    province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province"
    },
    status: {
        type: Boolean,
        default: true,
    },
    prize: String
})
const Station = mongoose.model("Station", stationSchema)
module.exports = Station