const { mongoose } = require("../singleton")

mongoose.set("debug", true)
mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB, {
    keepAlive: true,
    useNewUrlParser: true
})

module.exports = {
    User: require("./User"),
    Message: require("./Message"),
    Room: require("./Room")
}
