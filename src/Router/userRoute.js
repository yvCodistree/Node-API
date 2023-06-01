const { signup, login, getUserProfile } = require("../Controller/userController");
const { userAuth } = require("../Middleware/userAuth");
const { signupVld, loginVld } = require("../Validation/userValidation");

module.exports = (app) => {
  app.post("/signup", signupVld, signup);
  app.post("/login", loginVld, login);
  app.get("/get-profile", userAuth, getUserProfile);
};
