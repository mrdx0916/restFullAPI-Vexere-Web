const mongoose = require("mongoose");
const { seatSchema } = require("./seat");
const ticketSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip"
        },
        seatBooked: [seatSchema],
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)
const Ticket = mongoose.model("Ticket", ticketSchema)
module.exports = Ticket;