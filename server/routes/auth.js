const { express, jwt } = require("../singleton")
const router = express.Router()
const db = require("../models")

router.post("/login", async (req, res, next) => {
	try {
		let user = await db.User.findOne({
			username: req.body.username
		})
		let { _id, username } = user
		let isMatch = await user.comparePassword(req.body.password)
		if (isMatch) {
			let token = await jwt.sign(
				{
					userId: _id
				},
				process.env.SECRET_KEY
			)
			res.status(200).json({
				userId: _id,
				username,
				token
			})
		} else {
			next({
				status: 400,
				message: "Incorrect password"
			})
		}
	} catch (error) {
		next({
			status: 400,
			message: "Username not found"
		})
	}
})

router.post("/signup", async (req, res, next) => {
	try {
		let user = await db.User.create(req.body)
		let { _id, username } = user
		let token = await jwt.sign(
			{
				userId: _id
			},
			process.env.SECRET_KEY
		)
		res.status(201).json({
			userId: _id,
			username,
			token
		})
	} catch (error) {
		if (error.code === 11000) {
			next({
				status: 400,
				message: "This username is already taken"
			})
		}
		next(error)
	}
})

module.exports = router
