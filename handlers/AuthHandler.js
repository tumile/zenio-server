const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.restAuthorize = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, process.env.SECRET)
        const { userId } = payload
        if (req.params.userId && userId !== req.params.userId) throw Error()
        req.userId = userId
        next()
    } catch (error) {
        next({
            status: 401,
            type: "UNAUTHORIZED"
        })
    }
}

exports.socketAuthorize = async (socket, next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await jwt.verify(token, process.env.SECRET)
        const { userId } = payload
        socket.userId = userId
        next()
    } catch (error) {
        socket.emit("UNAUTHORIZED")
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user)
            return next({
                status: 400,
                type: "EMAIL_NOT_FOUND"
            })
        const isMatch = await user.comparePassword(req.body.password)
        if (!isMatch)
            return next({
                status: 400,
                type: "INVALID_PASSWORD"
            })
        const { _id: userId, firstName, lastName, avatar } = user
        const token = await jwt.sign(
            {
                userId,
                firstName,
                lastName,
                avatar
            },
            process.env.SECRET
        )
        res.status(200).json({
            userId,
            firstName,
            lastName,
            avatar,
            token
        })
    } catch (error) {
        next({
            status: 500,
            type: "DATABASE_ERROR"
        })
    }
}

exports.signup = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        const { _id: userId, firstName, lastName, avatar } = user
        const token = await jwt.sign(
            {
                userId,
                firstName,
                lastName,
                avatar
            },
            process.env.SECRET
        )
        res.status(200).json({
            userId,
            firstName,
            lastName,
            avatar,
            token
        })
    } catch (error) {
        if (error.code === 11000)
            return next({
                status: 400,
                type: "EMAIL_TAKEN"
            })
        next({
            status: 500,
            type: "DATABASE_ERROR"
        })
    }
}
