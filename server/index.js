const { app, server } = require("./singleton");
const authRoutes = require("./routes/auth");
require("./routes/chat");

app.use("/auth", authRoutes);

app.use((req, res, next) => {
	let err = new Error("Page not found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	console.log("heyy");

	res.status(err.status || 500).json({
		error: {
			message: err.message || "Oops! Something went wrong :("
		}
	});
});

server.listen(process.env.PORT, () => console.log("Listening on port 4000"));
