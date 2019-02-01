const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    givenName: {
        type: String,
        require: true
    },
    familyName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        }
    ]
})

module.exports = mongoose.model("User", userSchema)
