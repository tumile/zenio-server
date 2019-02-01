const Room = require("../models/Room")
const User = require("../models/User")

const PAGE_LIMIT = 15

exports.getAllRooms = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        const rooms = await Room.find({ _id: { $in: user.rooms } })
            .sort({ updatedAt: -1 })
            .skip(parseInt(req.query.skip))
            .limit(PAGE_LIMIT)
            .populate({
                path: "members",
                select: "firstName lastName avatar"
            })
            .populate({
                path: "messages",
                options: {
                    limit: PAGE_LIMIT,
                    sort: { createdAt: -1 }
                }
            })
        res.status(200).json({
            rooms,
            canLoadMore: !(rooms.length < PAGE_LIMIT)
        })
    } catch (error) {
        next({
            status: 500,
            type: "DATABASE_ERROR"
        })
    }
}

exports.getSingleRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.roomId)
            .populate({
                path: "members",
                select: "firstName lastName avatar"
            })
            .populate({
                path: "messages",
                options: {
                    sort: { createdAt: -1 },
                    limit: PAGE_LIMIT
                }
            })
        res.status(200).json({ room })
    } catch (error) {
        next({
            status: 500,
            type: "DATABASE_ERROR"
        })
    }
}

exports.getMessagesInRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(
            req.params.roomId,
            "messages"
        ).populate({
            path: "messages",
            options: {
                sort: { createdAt: -1 },
                skip: parseInt(req.query.skip),
                limit: PAGE_LIMIT
            }
        })
        res.status(200).json({
            messages: room.messages,
            canLoadMore: !(room.messages < PAGE_LIMIT)
        })
    } catch (error) {
        next({
            status: 500,
            type: "DATABASE_ERROR"
        })
    }
}
