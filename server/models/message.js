const { mongoose } = require("../singleton");

const messagechema = new mongoose.Schema(
	{
		body: {
			type: String,
			required: true
		},
		media: String,
		sentBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Message", messagechema);
