const { io, jwt } = require("../singleton")
const db = require("../models")

io.on("connection", (socket) => {
	console.log(`${socket.id} connected`)

	socket.use(async (packet, next) => {
		try {
			const token = packet.handshake.query.token
			const payload = await jwt.verify(token, process.env.SECRET_KEY)
			const user = await db.User.findById(payload.userId)
			const { username } = user
			socket.username = username
			next()
		} catch (error) {
			next(new Error("Authentication error"))
		}
	})

	// new_message event
	socket.on("new_message", async (data) => {
		// if the user is currently in a room
		if (socket.currentRoom) {
			try {
				// add new message to the room
				const [newMess, room] = await Promise.all([
					db.Message.create(data),
					db.Room.findById(socket.currentRoom)
				])
				room.messages = [...room.messages, newMess]
				await room.save()

				// emit the new message to everybody in the room
				socket.in(socket.currentRoom).emit("new_message", newMess)
			} catch (error) {
				next(error)
			}
		}
	})

	// typing event
	socket.on("typing", () => {
		// if the user is currently in a room
		if (socket.currentRoom)
			// broadcast to everybody in the room
			socket.in(socket.currentRoom).broadcast.emit("typing", {
				username: socket.username
			})
	})

	// stop_typing event
	socket.on("stop_typing", () => {
		// if the user is currently in a room
		if (socket.currentRoom)
			// broadcast to everybody in the room
			socket.in(socket.currentRoom).broadcast.emit("stop_typing", {
				username: socket.username
			})
	})

	// when an user select a room on client, join the socket to roomId
	socket.on("join_room", async (roomId) => {
		socket.currentRoom = roomId
		socket.join(roomId)
		const room = await db.Room.findById(roomId)
			.populate({
				path: "messages",
				options: { limit: 20 }
			})
			.populate({
				path: "members",
				select: ["username", "avatar"]
			})
		socket.emit("load_room", room)
	})

	socket.on("leave_room", () => {
		socket.currentRoom = null
		socket.leave(socket.currentRoom)
	})

	socket.on("disconnect", () => {
		console.log(`${socket.id} disconnecting`)
	})
})
