const { express } = require("../singleton")
const router = express.Router()
const db = require("../models")

router.get("/find", ({ name }, res, next) => {})

router.post("/loadrooms", async ({ userId }, res, next) => {
	try {
		const user = await db.User.findOne(userId).populate("rooms")
		res.status(200).json({ rooms: user.rooms })
	} catch (error) {
		next({
			status: 400,
			message: "User not found"
		})
	}
})

router.post("/newroom", async (req, res) => {
	const { user, other } = req
	const room = await db.Room.create({ members: [user._id, other._id] })
	return room._id
})

module.exports = router
