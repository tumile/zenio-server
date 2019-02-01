const jwt = require("jsonwebtoken")

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
