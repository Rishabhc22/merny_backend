const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	avatar: {
		type: String,
		default: "https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg",
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	gender: {
		type: String,
		enum: ["male", "female"],
		default: "male",
	},
	mobile: {
		type: String,
		minLength: 10,
		maxLength: 10,
	},
	address: {
		type: String,
	},
	bio: {
		type: String,
	},
	website: {
		type: String,
	},
	follower: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	saved: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
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

module.exports = mongoose.model("User", userSchema);