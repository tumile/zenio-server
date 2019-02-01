const router = require("express").Router()
const RoomHandler = require("../handlers/RoomHandler")
const AuthHandler = require("../handlers/AuthHandler")
const UserHandler = require("../handlers/UserHandler")

router
    .post("/auth/login", AuthHandler.login)
    .post("/auth/signup", AuthHandler.signup)

router
    .use("/rooms", AuthHandler.restAuthorize)
    .get("/", RoomHandler.getAllRooms)
    .get("/:roomId", RoomHandler.getSingleRoom)
    .get("/:roomId/messages", RoomHandler.getMessagesInRoom)

router
    .use("/users", AuthHandler.restAuthorize)
    .post("/find", UserHandler.findUser)

module.exports = router
