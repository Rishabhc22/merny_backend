const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
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
	createdAt: {
		type: Date,
		immutable: true,
		default: () => {
			return Date.now();
		},
	},
	updatedAt: {
		type: Date,
		default: () => {
			return Date.now();
		},
	},
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
