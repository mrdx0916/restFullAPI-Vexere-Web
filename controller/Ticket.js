const Ticket = require('../model/Ticket');

const getTicket = async (req, res) => {
    // const { username } = req.body
    console.log("user:", req.user._id);
    try {
        const foundedTicket = await Ticket.find({ userId: req.user._id })
            .populate("userId", "name -_id ")
            .populate({
                path: "trip", select: "fromStation toStation price startedDate departerTime arrivalTime -_id",
                populate: [
                    { path: "FromProvinceId", select: "name -_id" },
                    { path: "ToProvinceId", select: "name -_id" },
                    // { path: "carId", select: "name" }
                ]

            });
        res.status(200).send(foundedTicket);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" });
    }
}
module.exports = getTicket;