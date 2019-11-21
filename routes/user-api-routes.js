const passport = require("../config/passport");
const { usersController } = require("../controllers")

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });
  app.post("/api/signup", usersController.create);
  app.get("/logout", usersController.logOut);
  app.get("/api/user_data", userController.getUserData);
};
