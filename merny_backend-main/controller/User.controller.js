const userModel = require("../models/user.model");

//  Search all users- "/search"

exports.search = async (req, res) => {
	try {
		const get_user = await userModel.find();
		console.log(get_user);
		if (!get_user) {
			return res.status(404).json({
				message: "No user found",
			});
		}
		res.status(200).json({
			users: get_user,
		});
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({
			message: err.message,
		});
	}
};

// Get User by User ID - “/user/{id}”

exports.get_userById = async (req, res) => {
	try {
		const userId = req.params.id;
		console.log(userId);
		get_user = await userModel.findById(userId);
		if (get_user) {
			return res.status(200).json({
				user: get_user,
			});
		}
	} catch (err) {
		return res.status(500).send({
			message: err.message,
		});
	}
};

// Update User - “/user”

exports.update_user = async (req, res) => {
	try {
		const userId = req._id;
		console.log(userId);
		const update_request = req.body;
		console.log(update_request);

		updated_user = await userModel.findByIdAndUpdate({ _id: userId }, update_request);
		if (!updated_user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		console.log("Updated Successfully");
		return res.status(200).json({
			message: "User updated successfully",
		});
	} catch (error) {
		console.log(error.message);
	}
};

// Follow a User - “/user/{id}/follow”

exports.follow_user = async (req, res) => {
	try {
		req.user = req.params.id;

		if (req._id !== req.user && req.user !== undefined && req.user !== "null") {
			get_user_following = await userModel.findById({ _id: req.user });
			get_user_follower = await userModel.findById({ _id: req._id });
			if (!get_user_following) {
				return res.status(404).json({
					message: "User not found",
				});
			}
			if (!get_user_following.follower.includes(req._id)) {
				get_user_following.follower.push(req._id);
				await get_user_following.save();

				get_user_follower.following.push(req.user);
				await get_user_follower.save();
				return res.status(200).json({
					message: "User successfully followed",
					get_user_following,
				});
			}
			if (get_user_follower.follower.includes(req._id)) {
				return res.status(200).json({
					message: "You followed this user",
				});
			}
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
};

// UnFollow a User - “/user/{id}/unfollow”

exports.unfollow_user = async (req, res) => {
	try {
		req_user = req.params.id;

		if (req._id !== req_user && req_user !== undefined && req_user !== "null") {
			get_user_following = await userModel.findById({ _id: req_user });
			get_user_follower = await userModel.findById({ _id: req._id });
			if (!get_user_following) {
				return res.status(404).json({
					message: "User not found",
				});
			}
			if (get_user_following.follower.includes(req._id)) {
				let index = get_user_following.follower.indexOf(req._id);
				get_user_following.follower.splice(index, 1);
				await get_user_following.save();

				index = get_user_follower.following.indexOf(req_user);
				get_user_follower.following.splice(index, 1);
				await get_user_follower.save();

				return res.status(200).json({
					message: "User successfully unfollowed",
					get_user_following,
				});
			}
			if (get_user_follower.follower.includes(req._id)) {
				return res.status(200).json({
					message: "You followed this user",
				});
			}
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message,
		});
	}
};

// Get all user suggestions- “/suggestionsUser”

exports.getSuggestions = async (req, res) => {
	let get_suggestions = [];
	const get_data = await userModel.find(follwing.includes("req._id"));

	const people_I_follow = get_data.following;

	for (let people of people_I_follow) {
		let get_followers = await userModel.findById(people.id);
		if (get_followers) {
			get_suggestions.push(get_followers.follower);
			get_suggestions.push(get_followers.following);
			get_followers = null;
		}
	}

	if (!people_I_following) {
		return res.status(404).json({
			message: "Suggestion not found",
		});
		return res.status(200).json({
			suggestions: people_I_follow,
		});
	}
};
