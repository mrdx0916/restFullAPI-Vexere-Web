// const Province = require("./../model/Province");
const Province = require("../model/Province")

const postProvice = async (req, res) => {
    const { name, type, code } = req.body;
    try {
        const foundProvince = await Province.findOne({ code })
        if (foundProvince)
            return res.status(400).send({ messange: "Province already exist" })
        const newProvince = new Province({
            name, type, code
        })
        const result = await newProvince.save();
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong!!!", err })
    }

}
const getProvince = async (req, res) => {
    try {
        const result = await Province.find({ status: true });
        res.send(result);
    } catch (err) {
        res.status(500).send({ message: "something went wrong", err })
    }
}
const putProvince = async (req, res) => {
    const { name, type, code } = req.body;
    try {
        let foundedProvincePut = await Province.findOne({ code });
        if (!foundedProvincePut)
            return res.status(400).send({ message: "Invalid Province , id does not exist" });
        foundedProvincePut.name = name;
        foundedProvincePut.type = type;
        // foundedProvincePut.type = code;
        // foundedProvincePut = { name, type, code };
        const result = await foundedProvincePut.save()
        res.send(result)
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong", err })

    }



}
module.exports = { postProvice, getProvince, putProvince };