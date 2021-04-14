const mongoose = require("mongoose");
const { provinceSchema } = require("./Province");
const { seatSchema } = require("./seat");
const statePointSchema = mongoose.Schema({
    time: { type: String, default: "" },
    place: { type: String, required: "" }
});
const tripSchema = mongoose.Schema({
    fromStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
    },
    toStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
    },
    FromProvinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
        required: true,
    },
    ToProvinceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
        required: true,
    },
    pickUpPoint: [statePointSchema],
    dropOffPoint: [statePointSchema],
    price: {
        type: Number,
        require: true,
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car",
    },
    startedDate: Date,
    departerTime:
    {
        type: Date,
        required: true
    },
    arrivalTime:
    {
        type: Date,
        required: true
    },
    code: {
        type: String,
        unique: true,
    },
    seats: [seatSchema],
    status:
    {
        type: Boolean,
        require: true,
    }
},
    {
        timestamps: true
    }
)
const Trip = mongoose.model("Trip", tripSchema)
module.exports = Trip