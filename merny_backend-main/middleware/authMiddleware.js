const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN } = require("../config/auth.config");

const isAuthenticated = (req, res, next) => {
	try {
		const token = req.headers["x-access-token"];
		if (!token) {
			return res.status(500).json({
				message: "Please login first.",
			});
		} else {
			jwt.verify(token, JWT_ACCESS_TOKEN, (err, decoded) => {
				if (err) {
					return res.status(500).json({ message: "UnAuthorized User", err });
				}
				req._id = decoded._id;
			});
			next();
		}
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = {
	isAuthenticated,
};
