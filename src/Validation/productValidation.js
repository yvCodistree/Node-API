const { check, param } = require("express-validator");
const Mongoose = require("mongoose");
const baseValidator = require("../Helper/baseValidator");
const productModal = require("../Model/productModal");

module.exports.createProductValidator = [
  check("name").bail().not().isEmpty().withMessage("Name is Required"),
  check("color").bail().not().isEmpty().withMessage("Color is required"),
  check("quantity")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Only Number is Allowed"),
  check("price")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Price is Required")
    .isNumeric()
    .withMessage("Only Number is Allowed"),
  check("description")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Descripation is Required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.updateProductValidator = [
  param("id")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Id Is Required")
    .custom(async (value, { req }) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
      const product = await productModal.findById(value);
      if (!product) {
        return Promise.reject("Product not found with this ID");
      }
    }),
  check("name").bail().not().isEmpty().withMessage("Name is Required"),
  check("color").bail().not().isEmpty().withMessage("Color is required"),
  check("quantity")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Only Number is Allowed"),
  check("price")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Price is Required")
    .isNumeric()
    .withMessage("Only Number is Allowed"),
  check("description")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Descripation is Required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.deleteProductValidator = [
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
