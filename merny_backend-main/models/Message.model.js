const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
	conversation: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Conversation",
		required: true,
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	recipients: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	],
	text: {
		type: String,
	},
	media: [
		{
			type: String,
		},
	],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
