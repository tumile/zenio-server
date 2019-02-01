const AuthHandler = require("../handlers/AuthHandler")
const Room = require("../models/Room")
const Message = require("../models/Message")
const User = require("../models/User")

const connect = io => {
    io.use(AuthHandler.onsocketAuthorize)

    io.on("connection", socket => {
        socket.join(socket.userId)

        socket.on("NEW_ROOM", async function({ members }, callback) {
            try {
                const tempRoom = await Room.create({
                    members
                })
                const populateTask = Room.populate(tempRoom, {
                    path: "members",
                    select: "firstName lastName avatar"
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
                callback(null) // null means no error occurred
            } catch (error) {
                console.log(error)
                callback({
                    status: 500,
                    type: "DATABASE_ERROR"
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
