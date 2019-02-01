const AuthHandler = require("../handlers/AuthHandler")
const Room = require("../models/Room")
const Message = require("../models/Message")
const User = require("../models/User")

const connect = io => {
    io.use(AuthHandler.socketAuthorize)

    io.on("connection", socket => {
        socket.join(socket.userId)

        socket.on("NEW_ROOM", async function({ members }, callback) {
            try {
                const tempRoom = await Room.create({
                    members
                })
                const populateTask = Room.populate(tempRoom, {
                    path: "members",
                    select: "givenName familyName photo"
                })
                const updateTasks = members.map(id =>
                    User.findByIdAndUpdate(
                        id,
                        {
                            $push: { rooms: tempRoom._id }
                        },
                        { new: true }
                    )
                )
                const [room, ..._] = await Promise.all([
                    populateTask,
                    ...updateTasks
                ])
                members.map(id => io.to(id).emit("NEW_ROOM", room))
                callback(null)
            } catch (error) {
                callback({
                    status: 500,
                    type: "DATABASE_ERROR",
                    message: error.message
                })
            }
        })

        socket.on("NEW_MESSAGE", async ({ roomId, msg }, callback) => {
            try {
                const [message, room] = await Promise.all([
                    Message.create({
                        msg,
                        from: socket.userId
                    }),
                    Room.findById(roomId)
                ])
                room.messages.push(message._id)
                room.members.map(id =>
                    io.to(id).emit("NEW_MESSAGE", { roomId, message })
                )
                await room.save()
                callback(null)
            } catch (error) {
                callback({
                    status: 500,
                    type: "DATABASE_ERROR",
                    message: error.message
                })
            }
        })

        // TODO: offline support / push notification
        socket.on("disconnect", () => {})
    })
}

module.exports = {
    connect
}
