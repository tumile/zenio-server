require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(cors());

module.exports = {
	express,
	app,
	server,
	io,
	mongoose,
	bcrypt,
	jwt
};
