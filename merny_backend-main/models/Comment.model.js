const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	content: {
		type: "String",
	},
	tag: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
	reply: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment",
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
		required: true,
	},
	postUserId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
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

module.exports = mongoose.model("Comment", commentSchema);
