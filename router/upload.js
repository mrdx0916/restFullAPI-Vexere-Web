const express = require("express");
const router = express.Router()
const fs = require("fs");
const multer = require("multer");

const auth = require("../helper/auth");

const upload = multer({
    storage: multer.diskStorage({
        destination: "images",
        filename(req, file, done) {
            const name = Date.now() + "-" + file.originalname;
            done(null, name);
        },

    }),

})
router.post("/upload/avatar", auth(), upload.single("data"), async (req, res) => {

    try {
        const { path } = req.file;
        console.log(path);
        req.user.avatar = path;
        const result = await req.user.save();
        // console.log(result);
        res.status(200).send({ message: "upload successfully" });
    } catch (err) {
        console.log(err);
        fs.unlinkSync(path);
        res.status(500).send({ message: "you are not authorized " });
    }



})
module.exports = router;