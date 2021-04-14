const mongoose = require("mongoose");
// const { seatSchema } = require("../model/seat")
const carSchema = mongoose.Schema({
    type: {
        type: String,
        default: "CarSeat",
        required: true
    },
    Numberseats: {
        type: Number,
        required: true,
    },
    licensePlates: {
        type: String,
        required: true,
    },

    status: {
        type: Boolean,
        default: true
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
    }
},
    {
        timestamps: true
    }
);
const Car = mongoose.model("Car", carSchema)
module.exports = Car