const mongoose = require("mongoose");
const app = require("./app");
const serverConfig = require("./config/server.config");
const { MONGO_URI } = require("./config/db.config");

//DB Connection
mongoose.connect(MONGO_URI);

mongoose.connection.on("error", (err) => {
	console.log(err);
});

mongoose.connection.once("connected", () => {
	console.log("Database connection successful..!");
});

//Start Server
app.listen(serverConfig.PORT, () => {
	console.log(`Server started at port ${serverConfig.PORT}`);
});
