const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookByAuthor,
  getBooksList,
} = require("../Controller/bookController");
const { userAuth } = require("../Middleware/userAuth");
const {
  createBookVld,
  updateBookVld,
  deleteBookVld,
  getBookByAuthorVld,
} = require("../Validation/bookValidation");

module.exports = (app) => {
  app.get("/", userAuth, getBooks);
  app.post("/create-book", userAuth, createBookVld, createBook);
  app.put("/update-book/:id", userAuth, updateBookVld, updateBook);
  app.delete("/delete-book/:id", userAuth, deleteBookVld, deleteBook);
  app.get(
    "/get-book-by-author/:id",
    userAuth,
    getBookByAuthorVld,
    getBookByAuthor
  );
  app.get("/get-book-list", userAuth, getBooksList);
};
