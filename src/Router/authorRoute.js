const {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../Controller/authorController");
const { userAuth } = require("../Middleware/userAuth");
const {
  createAuthorVld,
  updateAuthorVld,
  deleteAuthorVld,
} = require("../Validation/authorValidation");

module.exports = (app) => {
  app.get("/", userAuth, getAllAuthors);
  app.post("/create-author", userAuth, createAuthorVld, createAuthor);
  app.put("/update-author/:id", userAuth, updateAuthorVld, updateAuthor);
  app.delete("/delete-author/:id", userAuth, deleteAuthorVld, deleteAuthor);
};
