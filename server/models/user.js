const { mongoose, bcrypt } = require("../singleton")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: String,
	rooms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Room"
		}
	],
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
})

userSchema.pre("save", async function(next) {
	try {
		if (!this.isModified("password")) return next()
		let hashedPassword = await bcrypt.hash(this.password, 10)
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

module.exports = mongoose.model("User", userSchema)
