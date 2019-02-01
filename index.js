const bodyParser = require("body-parser")
const compression = require("compression")
const dotenv = require("dotenv")
const express = require("express")
const helmet = require("helmet")
const { Server: HttpServer } = require("http")
const SocketIO = require("socket.io")
const routes = require("./api/routes")
const sockets = require("./api/sockets")
const db = require("./models")

dotenv.config()
db.connect()

const app = express()
const server = new HttpServer(app)
const ioServer = SocketIO(server, { path: "/sockets" })

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use("/", routes)
app.use((error, req, res, next) => {
    const { status, type, message } = error
    res.status(status).json({
        error: {
            type,
            message
        }
    })
})
sockets.connect(ioServer)

server.listen(process.env.PORT || 4000, () =>
    console.log(`Server running on port ${process.env.PORT || 4000}`)
)
