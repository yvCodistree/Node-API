const { check, param } = require("express-validator");
const baseValidator = require("../Helper/baseValidator");
const bookModal = require("../Model/book");
const Mongoose = require("mongoose");

module.exports.createBookVld = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("author_id")
    .not()
    .isEmpty()
    .withMessage("Author is required")
    .isMongoId()
    .withMessage("Author is not valid"),
  check("launch_date")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Launch Date is required")
    .custom((value, { req }) => {
      if (new Date(value) > new Date()) {
        return Promise.reject("Launch Date should be less than current date");
      }
      return true;
    }),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("genre").not().isEmpty().withMessage("Genre is required"),
  check("number_of_sales")
    .not()
    .isEmpty()
    .withMessage("Number of sales is required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.updateBookVld = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async (value, { req }) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
      const book = await bookModal.findOne({
        _id: value,
        user: req.user._id,
      });
      if (!book) {
        return Promise.reject("book not found with this ID");
      }
      req.book = book;
    }),
  check("name").not().isEmpty().withMessage("Name is required"),
  check("author_id")
    .not()
    .isEmpty()
    .withMessage("Author is required")
    .isMongoId()
    .withMessage("Author is not valid"),
  check("launch_date")
    .bail()
    .not()
    .isEmpty()
    .withMessage("Launch Date is required")
    .custom((value, { req }) => {
      if (new Date(value) > new Date()) {
        return Promise.reject("Launch Date should be less than current date");
      }
      return true;
    }),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("genre").not().isEmpty().withMessage("Genre is required"),
  check("number_of_sales")
    .not()
    .isEmpty()
    .withMessage("Number of sales is required"),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.deleteBookVld = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async (value, { req }) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
      const book = await bookModal.findOne({
        _id: value,
        user: req.user._id,
      });
      if (!book) {
        return Promise.reject("book not found with this ID");
      }
      req.book = book;
    }),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];

module.exports.getBookByAuthorVld = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Id is required")
    .custom(async (value, { req }) => {
      if (!Mongoose.isValidObjectId(value)) {
        return Promise.reject("param id would be valid");
      }
      const books = await bookModal.find({
        author_id: value,
        user: req.user._id,
      });
      if (!books) {
        return Promise.reject("books not found with this author ID");
      }
      req.books = books;
    }),
  (req, res, next) => {
    baseValidator(req, res, next);
  },
];
