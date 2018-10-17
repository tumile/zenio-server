const { mongoose } = require("../singleton");
const Message = require("./message");

const roomSchema = new mongoose.Schema(
	{
		name: String,
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message"
			}
		],
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Room", roomSchema);
