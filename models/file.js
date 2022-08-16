const mongoose = require("mongoose")

const fileSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number
    },
    uuid: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
    },
    receiver: {
        type: String,

    }



}, { timestamps: true })

module.exports = mongoose.model("File", fileSchema)
