const Room = require("../models/Room")
const User = require("../models/User")

exports.getAllRooms = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        const rooms = await Room.find({ _id: { $in: user.rooms } })
            .sort({ updatedAt: -1 })
            .skip(parseInt(req.query.skip))
            // .limit() // TODO: Pagination
            .populate({
                path: "members",
                select: "firstName lastName avatar"
            })
            .populate({
                path: "messages"
            })
        res.status(200).json({
            rooms
        })
    } catch (error) {
        next({
            status: 500,
            type: "DATABASE_ERROR"
        })
    }
}
