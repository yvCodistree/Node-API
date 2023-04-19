const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookByAuthor,
  getBooksList,
} = require("../Controller/bookController");
const {
  createBookVld,
  updateBookVld,
  deleteBookVld,
  getBookByAuthorVld,
} = require("../Validation/bookValidation");

module.exports = (app) => {
  app.get("/", getBooks);
  app.post("/create-book", createBookVld, createBook);
  app.put("/update-book/:id", updateBookVld, updateBook);
  app.delete("/delete-book/:id", deleteBookVld, deleteBook);
  app.get("/get-book-by-author/:id", getBookByAuthorVld, getBookByAuthor);
  app.get("/get-book-list", getBooksList);
};
