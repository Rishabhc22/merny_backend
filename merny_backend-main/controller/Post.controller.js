const postModel = require("../models/Post.model");
const userModel = require("../models/user.model");

// CREATE POSTS
exports.create_post = async (req, res) => {
	console.log("Creating post");
	try {
		const { content, image } = req.body;
		if (content == null) {
			return res.status(400).json({ message: "No content" });
		} else {
			const user = await userModel.findOne({ _id: req._id });
			const newPost = await postModel.create({ content: content, images: image, user: user });

			user.saved.push = newPost._id;

			if (newPost) {
				res.status(200).json({
					message: "Created Post!",
					newPost,
				});
			}
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// GET ALL POSTS FROM LOGGED IN USER
exports.get_post = async (req, res) => {
	try {
		console.log("in Get Post");
		const get_all_posts = await postModel.find({ user: req._id });

		if (!get_all_posts) {
			return res.status(400).json({
				message: "No post found",
			});
		}
		return res.status(200).json({
			message: "All post found",
			get_all_posts,
		});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// GET LIKES AND DISLIKES.
exports.post_Like_Dislike = async (req, res) => {
	try {
		console.log(req.params.id);

		const get_post = await postModel.findById(req.params.id);
		console.log(get_post);
		if (!get_post) {
			return res.status(404).json({ message: "No post found" });
		}
		if (get_post.likes.includes(req._id)) {
			const index = get_post.likes.indexOf(req._id);
			get_post.likes.splice(index, 1);
			await get_post.save();

			return res.status(200).json({ message: "disliked" });
		} else {
			get_post.likes.push(req._id);
			await get_post.save();
			return res.status(200).json({
				message: "Liked",
			});
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

//UPDATE POST

// GET POST WITH ID
// DELETE POST
