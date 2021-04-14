const Car = require("../model/car");
const Branch = require("../model/branch");
const Seat = require("../model/seat")

const postCar = async (req, res) => {
    const { type, Numberseats, licensePlates, branchId } = req.body;
    try {
        const foundeBranch = await Branch.findOne({ _id: branchId });
        if (!foundeBranch || !foundeBranch.status) {
            return res.status(500).send({ message: "branch does not exist" })
        }
        const foundedCar = await Car.findOne({ licensePlates });
        if (foundedCar && foundedCar.status) {
            return res.status(400).send({ message: "Car existed" })
        }
        const newCar = new Car({
            type, Numberseats, licensePlates, branchId
        })
        const result = await newCar.save();
        res.status(200).send(result);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" })
    }

}
const getCar = async (req, res) => {
    try {
        const result = await Car.find({ status: true })
        res.status(200).send(result)
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    postCar, getCar
}