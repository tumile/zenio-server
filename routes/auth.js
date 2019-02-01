const { express, jwt } = require("../singleton")
const router = express.Router()
const db = require("../models")

router.post("/login", async (req, res, next) => {
	try {
		let user = await db.User.findOne({
			username: req.body.username
		})
		let { _id, username, avatar } = user
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
				token,
				avatar
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
		let user = await db.User.create({
			...req.body,
			avatar:
				req.body.avatar ||
				"https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
		})
		let { _id, username, avatar } = user
		let token = await jwt.sign(
			{
				userId: _id
			},
			process.env.SECRET_KEY
		)
		res.status(201).json({
			userId: _id,
			username,
			token,
			avatar
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
