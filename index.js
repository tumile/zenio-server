const { app, server } = require("./singleton")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
require("./routes/chat")

app.use("/auth", authRoutes)
app.use("/user", userRoutes)

app.use((req, res, next) => {
	let error = new Error("Page not found")
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error: {
			message: error.message || "Oops! Something went wrong :("
		}
	})
})

server.listen(process.env.PORT, () => console.log("Listening on port 4000"))
