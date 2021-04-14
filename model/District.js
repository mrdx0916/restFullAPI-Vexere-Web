const mongoose = require("mongoose");
const districtSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
    },
    code: { type: String, unique: true },
    status: {
        type: Boolean,
        default: true,
    }
},

    {
        timestamps: true,
    }
)
const District = mongoose.model("DisTrict", districtSchema);
module.exports = {
    District, districtSchema
}