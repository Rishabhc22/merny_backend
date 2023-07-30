exports.comment_isValid = (req, res, next) => {
	try {
		let content = req.body.content.trim();
		if (content.length > 0) next();
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};
