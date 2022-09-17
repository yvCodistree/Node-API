const { check, query, param } = require("express-validator");
const Mongoose = require("mongoose");
const baseValidator = require("../Helper/baseValidator");
const categoryModal = require("../Model/categoryModal");

module.exports.createCategoryValidator = [
  check("name").bail().not().isEmpty().withMessage("Category name is required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.deleteCategoryValidator = [
  param("id")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Id Is Required")
    .custom(async (value) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
    }),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.updateCategoryValidator = [
  param("id")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Id Is Required")
    .custom(async (value, { req }) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
      const category = await categoryModal.findById(value);
      if (!category) {
        return Promise.reject("category not found with this ID");
      }
    }),
  check("name").bail().not().isEmpty().withMessage("Name is Required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];
