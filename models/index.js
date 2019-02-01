const { mongoose } = require("../singleton")

mongoose.set("debug", true)
mongoose.Promise = Promise
mongoose.connect(
	process.env.MONGODB,
	{
		keepAlive: true,
		useNewUrlParser: true
	}
)

module.exports = {
	User: require("./user"),
	Room: require("./room"),
	Message: require("./message")
}
