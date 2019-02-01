const router = require("express").Router()
const RoomHandler = require("../handlers/RoomHandler")
const AuthHandler = require("../handlers/AuthHandler")
const UserHandler = require("../handlers/UserHandler")

router
    .post("/auth/login", AuthHandler.login)
    .post("/auth/signup", AuthHandler.signup)
    .post("/users/find", AuthHandler.restAuthorize, UserHandler.findUsers)
    .get(
        "/users/:userId/rooms",
        AuthHandler.restAuthorize,
        RoomHandler.getAllRooms
    )
    .get(
        "/users/:userId/rooms/:roomId",
        AuthHandler.restAuthorize,
        RoomHandler.getSingleRoom
    )
    .get(
        "/users/:userId/rooms/:roomId/messages",
        AuthHandler.restAuthorize,
        RoomHandler.getMessagesInRoom
    )
module.exports = router
