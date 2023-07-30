const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_ACCESS_TOKEN } = require("../config/auth.config");

// Check EMAIL PATTERN
const isValid_email = (email) => {
	let expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!expression.test(email)) {
		return true;
	} else {
		return false;
	}
};

// GENERATE ACCESS TOKEN ............

const generateAccessToken = (user_id) => {
	const accessToken = jwt.sign({ _id: user_id }, JWT_ACCESS_TOKEN, { expiresIn: "1d" });
	return accessToken;
};

// REGISTER USER ................

exports.register = async (req, res) => {
	try {
		const req_user = req.body;

		//CHECK PASSWORD LENGTH
		if (req_user.password.length < 6) {
			return res.status(400).json({
				message: "Password must be at least 6 characters.",
			});
		}

		//CHECK EMAIL FORMAT
		if (isValid_email(req_user.email)) {
			return res.status(400).json({
				message: "Email format is incorrect.",
			});
		}

		//CHECK IF EMAIL OR USERNAME ALREADY AVAILABLE
		const [get_user] = await User.find({
			$or: [{ email: req_user.email }, { username: req_user.username }],
		});

		if (get_user !== undefined) {
			if (get_user.username == req_user.username) {
				return res.status(400).json({
					message: "This user name already exists.",
				});
			}
			if (get_user.email == req_user.email) {
				return res.status(400).json({
					message: "This email already exists.",
				});
			}
		}

		//ENCRYPT PASSWORD

		const encrypt_password = bcrypt.hashSync(req_user.password, 10);

		const newUser = await User.create({
			fullname: req_user.fullname,
			username: req_user.username,
			email: req_user.email,
			password: encrypt_password,
			gender: req_user.gender,
		});

		return res.status(200).json({
			msg: "Registeration Successful",
			access_token: generateAccessToken(newUser.password),
			user: newUser,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// SIGN IN USER
exports.sign_in = async (req, res) => {
	try {
		const { email, password } = req.body;
		const get_user = await User.findOne({ email });

		if (!get_user) {
			return res.status(400).json({
				message: "This email does not exist.",
			});
		}

		const isMatch = bcrypt.compare(password, get_user.email);

		if (!isMatch) {
			return res.status(400).json({
				message: "Password is incorrect.",
			});
		}

		res.status(200).json({
			message: "Login Successful",
			access_token: generateAccessToken(get_user._id),
			get_user,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

// Update User Account
exports.update = async (req, res) => {
	try {
		get_user = await User.findById(req._id);
		if (get_user) {
			res.status(200).json({ message: "Update Successfully" });
		}
	} catch (error) {
		console.log(error.message);
	}
};

// LogOut User Account
exports.logout = async (req, res) => {
	try {
		const { email, password } = req.body;
		get_user = await User.findOne({
			email,
		});
		if (!get_user) {
			return res.status(400).json({
				message: "Email Not Found",
			});
		}
		return res.status(200).json({ message: "Logged Out" });
	} catch (err) {
		console.log(err.message);
	}
};
