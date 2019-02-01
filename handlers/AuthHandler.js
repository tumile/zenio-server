const jwt = require("jsonwebtoken")
const User = require("../models/User")
const crypto = require("crypto")

exports.restAuthorize = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, process.env.SECRET_KEY)
        const { userId } = payload
        if (
            (req.params.userId && req.params.userId !== userId) ||
            (req.params.roomId && !(await User.isMember(userId, roomId)))
        )
            throw new Error("Trying to access unauthorized route")
        req.userId = userId
        next()
    } catch (error) {
        next({
            status: 401,
            type: "UNAUTHORIZED",
            message: error.message
        })
    }
}

exports.socketAuthorize = async (socket, next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await jwt.verify(token, process.env.SECRET_KEY)
        const { userId } = payload
        socket.userId = userId
        next()
    } catch (error) {
        socket.emit("ERROR", {
            type: "UNAUTHORIZED",
            message: error.message
        })
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
                type: "WRONG_PASSWORD"
            })
        const { _id: userId, givenName, familyName, photo } = user
        const token = await jwt.sign(
            {
                userId
            },
            process.env.SECRET_KEY
        )
        res.status(200).json({
            userId,
            givenName,
            familyName,
            photo,
            token
        })
    } catch (error) {
        next({
            status: 500,
            type: "DATABASE_ERROR",
            message: error.message
        })
    }
}

exports.signup = async (req, res, next) => {
    try {
        if (!req.body.photo)
            req.body.photo = `https://robohash.org/${crypto
                .randomBytes(10)
                .toString("hex")}.jpg?size=100x100&set=set3`
        const user = await User.create(req.body)
        const { _id: userId, givenName, familyName, photo } = user
        const token = await jwt.sign(
            {
                userId
            },
            process.env.SECRET_KEY
        )
        res.status(200).json({
            userId,
            givenName,
            familyName,
            photo,
            token
        })
    } catch (error) {
        if (error.code === 11000)
            return next({
                status: 400,
                type: "EMAIL_USED"
            })
        next({
            status: 500,
            type: "DATABASE_ERROR",
            message: error.message
        })
    }
}
