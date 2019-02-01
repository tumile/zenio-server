const mongoose = require("mongoose")

const options = {
    useFindAndModify: false,
    autoIndex: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    poolSize: 500,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
}

const attachEventListeners = () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected")
    })
    mongoose.connection.on("error", error => {
        console.error(`MongoDB connection error: ${error}`)
    })
    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected")
    })
}

const connect = () => {
    mongoose.set("debug", true)
    mongoose.Promise = global.Promise
    mongoose
        .connect(process.env.MONGODB_URL, options)
        .then(attachEventListeners)
        .catch(error => console.error(`MongoDB connection error: ${error}`))
}

module.exports = {
    connect
}
