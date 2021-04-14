const Branch = require("../model/branch");

const postBranch = async (req, res) => {
    const { name, address, code } = req.body;
    try {
        const foundeBranch = await Branch.findOne({ code });
        if (foundeBranch && foundeBranch.status) {
            return res.status(500).send({ message: "branch  existed" })
        }

        const newBranch = new Branch({
            name, address, code
        })
        const result = await newBranch.save();
        res.status(200).send(result);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" })
    }
}
const getBranch = async (req, res) => {
    try {
        const result = await Branch.find({ status: true })
        res.status(200).send(result)
    } catch (err) {
        console.log(err);
    }
}
module.exports = { postBranch, getBranch }