const Trip = require("../model/Trip");
const Province = require("../model/Province");
const { Seat } = require("../model/seat");
const Car = require("../model/car");
const mongoose = require("mongoose");
const Ticket = require("../model/Ticket");

const postTrip = async (req, res) => {
    let { FromProvinceId, ToProvinceId, price, carId, startedDate, departerTime, arrivalTime, code } = req.body;
    startedDate = startedDate + " 00:00:00";
    try {
        const foundedProvince = await Province.find().or([
            { _id: FromProvinceId },
            { _id: ToProvinceId }
        ])
        if (foundedProvince.length !== 2) {
            return res.status(400).send({ message: "Invalid Province" })
        };
        const foundedCar = await Car.findOne({ _id: carId })
        if (!foundedCar) return res.status(400).send({ message: "car invalid" });
        const foundedDeparterTime = await Trip.find({ departerTime });
        if (foundedDeparterTime.length) return res.status(400).send({ message: "departerTime existed " })
        const ArrSeat = [];
        for (var i = 0; i < foundedCar.Numberseats; i++) {
            const newSeat = new Seat({
                name: i + 1
            })
            ArrSeat.push(newSeat)
        }
        const newTrip = await new Trip({
            seats: ArrSeat, FromProvinceId, ToProvinceId, price, carId, startedDate, departerTime, arrivalTime, code
        }).save();
        res.status(200).send(newTrip);

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "something went wrong" })
    }

}
const postBookTrip = async (req, res) => {
    const { tripId, seatsId } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const foundedTripId = await Trip.findOne({ _id: tripId }).session(session);

        if (!foundedTripId) return res.status(401).send({ message: "trip doesn't exist!!!" });
        const arrSeatsTicket = [];
        seatsId.forEach(seat => {
            const indexSeat = foundedTripId.seats.findIndex(seat2 => seat2._id.toString() === seat);
            if (indexSeat === -1 || foundedTripId.seats[indexSeat].isBooked) return res.status(401).send({ message: "seat is wrong" });
            foundedTripId.seats[indexSeat].isBooked = true;
            foundedTripId.seats[indexSeat].user = req.user._id;
            arrSeatsTicket.push(foundedTripId.seats[indexSeat]);
        })
        await foundedTripId.save();
        await Ticket.create(
            [
                {
                    userId: req.user._id,
                    trip: tripId,
                    seatBooked: arrSeatsTicket,
                }
            ],
            { session: session }
        )
        await session.commitTransaction();
        session.endSession();
        res.status(200).send({ message: "Book ticket successfully!!" });


    } catch (err) {
        console.log(err);
        await session.abortTransaction();
        session.endSession();
        res.status(500).send({ message: "something went wrong" })
    }
}
module.exports = {
    postTrip, postBookTrip
}