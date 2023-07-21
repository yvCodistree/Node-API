const { check, query, param } = require("express-validator");
const Mongoose = require("mongoose");
const baseValidator = require("../Helper/baseValidator");
const authorModal = require("../Model/authorModal");

module.exports.createAuthorVld = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("birthDate").not().isEmpty().withMessage("Birth Date is required"),
  check("country").not().isEmpty().withMessage("Country is required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.updateAuthorVld = [
  param("id")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async (value, { req }) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
      const author = await authorModal.findOne({
        _id: value,
        user: req.user._id,
      });
      if (!author) {
        return Promise.reject("author not found with this ID");
      }
      req.author = author;
    }),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("birthDate").not().isEmpty().withMessage("Birth Date is required"),
  check("country").not().isEmpty().withMessage("Country is required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.deleteAuthorVld = [
  param("id")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async (value, { req }) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
      const author = await authorModal.findOne({
        _id: value,
        user: req.user._id,
      });
      if (!author) {
        return Promise.reject("author not found with this ID");
      }
      req.author = author;
    }),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];
