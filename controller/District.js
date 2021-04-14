const { District } = require("../model/District");
const Province = require("../model/Province");
const postDistrict = async (req, res) => {
    const { name, code, type, province } = req.body;
    try {
        const foundedProvince = await Province.findOne({ _id: province, status: true });
        console.log(foundedProvince);
        if (!foundedProvince) {
            return res.status(401).send({ message: "province does not exist" })
        }
        const foundedDistrict = await District.findOne({ code, name, status: true });
        if (foundedDistrict) {
            return status(401).send({ message: "district already exist!!" })
        }
        const newDistrict = new District({
            name, code, type, province
        })
        const result = await newDistrict.save();
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "somthing went wrong!!!!" })
    }
}
const getDistrict = async (req, res) => {
    try {
        const result = await District.find({ status: true })
        res.status(200).send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" })
    }
}
module.exports = {
    postDistrict, getDistrict
}