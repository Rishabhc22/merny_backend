const auth_controller = require("../controller/Authentications.contoller");
const user_controller = require("../controller/User.controller");
const post_controller = require("../controller/Post.controller");

const { isAuthenticated } = require("../middleware/authMiddleware");
const { comment_isValid } = require("../middleware/commentMiddleware");
const comment_controller = require("../controller/Comment.controller");

module.exports = function (app) {
	//.............................................. AUTHENTICATION  ROUTES ..............................................

	app.post("/register", auth_controller.register);

	app.post("/login", auth_controller.sign_in);

	app.post("/logout", isAuthenticated, auth_controller.logout);

	//.............................................. SEARCH ROUTES ..............................................

	app.get("/search", isAuthenticated, user_controller.search);
	app.get("/user/:id", isAuthenticated, user_controller.get_userById);
	app.patch("/user", isAuthenticated, user_controller.update_user);

	app.patch("/user/:id/follow", isAuthenticated, user_controller.follow_user);
	app.patch("/user/:id/unfollow", isAuthenticated, user_controller.unfollow_user);
	app.get("/suggestionsUser", isAuthenticated, user_controller.getSuggestions);

	//.............................................. COMMENT ROUTES ..............................................

	app.post("/comment", isAuthenticated, comment_isValid, comment_controller.addComment);
	app.post("/comment/:id", isAuthenticated, comment_isValid, comment_controller.updateComment);

	//.............................................. POST ROUTES ..............................................

	app.post("/posts", isAuthenticated, post_controller.create_post);
	app.get("/posts", isAuthenticated, post_controller.get_post);
	app.get("/post/:id", isAuthenticated, post_controller.post_Like_Dislike);
	//	app.delete("/post/:id", isAuthenticated, post_controller.delete_post);
	//	app.patch("/post/:id", isAuthenticated, post_controller.update_post);
};
