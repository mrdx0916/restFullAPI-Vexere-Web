const mongoose = require("mongoose");
// const { districtSchema } = require("./District");
const provinceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        code: { type: String, unique: true },
        type: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true
    }
)
const Province = mongoose.model("Province", provinceSchema);
module.exports = Province, provinceSchema
