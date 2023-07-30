const commentModel = require("../models/Comment.model");
const postModel = require("../models/Post.model");

exports.addComment = async (req, res) => {
	try {
		if (req.body._id) {
			get_reply = {
				content: req.body.content,
				reply: req.body.reply,
				tag: req.body.tag ? req.body.tag : {},
				postId: req.body.postId,
				postUserId: req.body.postUserId,
			};

			const userComment = await commentModel.create(get_reply);

			if (!userComment) {
				return res.status(400).json({
					userComment,
				});
			}
			return res.status(200).json({
				userComment,
			});
		} else {
			get_comment = {
				content: req.body.content,
				user: req._id,
				postId: req.body.postId,
				postUserId: req.body.postUserId,
			};
			const get_post = postModel.findById(postId);
			if (!get_post) {
				return res.status(404).json({
					message: "No post found",
				});
			}
			const get_reply = commentModel.create(get_comment);
			if (!get_reply) {
				return res.status(404).json({ message: "Comment not updated Successfully" });
			}
			return res.status(200).json({
				message: "Coment Successful",
				get_reply,
			});
		}
	} catch (e) {
		res.status(500).json({
			message: e.message,
		});
	}
};

// UPDATE COMMENT

exports.updateComment = (req, res) => {
	try {
		const get_commentId = req.params.id;
		const updated_content = req.body.content;

		if (!get_commentId) {
			return res.status(400).json({
				message: "Post ID is missing",
			});
		}
		const get_updatedContent = commentModel.findByIdAndUpdate(get_commentId, { content: updated_content });

		if (!get_updatedContent)
			return res.status(400).json({
				message: "content update unsuccessful",
			});
		return res.status(200).json({
			message: "content update successfully",
		});
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({
			message: "Error updating comment",
		});
	}
};

// Like A COMMENT

exports.likeComment = (req, res) => {
	const commentId = req.params.id;
	
};

