const mongoose = require("mongoose")
const seatSchema = mongoose.Schema({
    code: String,
    name: {
        type: String,
        required: true,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    status:
    {
        type: Boolean,
        default: true,
    }
},
    {
        timestamps: true,
    }
)
const Seat = mongoose.model("Seat", seatSchema)
module.exports = {
    Seat, seatSchema
}
