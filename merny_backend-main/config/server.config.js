if (process.env.NODE_ENV !== "production") {
	const env = require("dotenv");
	env.config();
}
module.exports = {
	PORT: process.env.PORT,
};
