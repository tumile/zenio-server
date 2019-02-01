const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

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
    password: {
        type: String,
        required: true
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

userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) return next()
        let hashedPassword = await bcrypt.hash(this.password, 12)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        next(error)
    }
}

userSchema.statics.hasRoom = async function(userId, roomId, next) {
    try {
        const user = await this.findById(userId)
        return user.rooms.includes(roomId)
    } catch (error) {
        next(error)
    }
}

module.exports = mongoose.model("User", userSchema)
