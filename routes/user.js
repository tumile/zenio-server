const { express, jwt } = require("../singleton")
const router = express.Router()
const db = require("../models")

const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const payload = await jwt.verify(token, process.env.SECRET_KEY)
		const { userId } = payload
		req.userId = userId
		next()
	} catch (err) {
		next({
			status: 401,
			message: "Please login first"
		})
	}
}

router.use(authenticate)

router.post("/find", async (req, res, next) => {
	try {
		const { username } = req.body
		const users = await db.User.find(
			{ _id: { $ne: req.userId }, username: { $regex: `${username}` } },
			{ username: 1, avatar: 1 }
		)
		res.status(200).json({ users })
	} catch (error) {
		next(error)
	}
})

router.post("/loadrooms", async (req, res, next) => {
	try {
		const { userId } = req.body
		const user = await db.User.findById(userId, { rooms: 1 })
		const rooms = await db.Room.find(
			{ _id: { $in: user.rooms } },
			{ name: 1, members: 1 }
		)
			.populate({ path: "members", select: ["username", "avatar"] })
			.sort({
				updatedAt: -1
			})
		res.status(200).json({ rooms })
	} catch (error) {
		next({
			status: 400,
			message: "User not found"
		})
	}
})

router.post("/createroom", async (req, res, next) => {
	try {
		const { userId, otherId } = req.body
		const room = await db.Room.create({ members: [userId, otherId] })
		const [user, other] = await Promise.all([
			db.User.findById(userId, { rooms: 1, username: 1, avatar: 1 }),
			db.User.findById(otherId, { rooms: 1, username: 1, avatar: 1 })
		])
		user.rooms = [...user.rooms, room._id]
		other.rooms = [...other.rooms, room._id]
		await Promise.all([user.save(), other.save()])

		// let {} = user
		// let { rooms: r2, ...retOther } = other
		res.status(200).json({
			room: {
				_id: room._id,
				members: [user, other]
			}
		})
	} catch (error) {
		next(error)
	}
})

module.exports = router
