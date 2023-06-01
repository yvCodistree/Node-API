const { check } = require("express-validator");
const userModal = require("../Model/user");
const baseValidator = require("../Helper/baseValidator");

module.exports.signupVld = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Email is required")
    .not()
    .isEmpty()
    .isEmail()
    .custom(async (value) => {
      if (await userModal.findOne({ email: value })) {
        return Promise.reject("Email already in use");
      }
    }),
  check("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "i"
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    ),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.loginVld = [
  check("email", "Email is required")
    .not()
    .isEmpty()
    .custom(async (value, { req }) => {
      const user = await userModal.findOne({ email: value });
      if (!user) {
        return Promise.reject("User not found with this email address");
      } else {
        req.loginUser = user;
      }
    }),
  check("password", "Password is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 chars long")
    .custom(async (value, { req }) => {
      const isMatch = await req.loginUser.comparePassword(value);
      if (!isMatch) return Promise.reject("Password or email is incorrect");
    }),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];
