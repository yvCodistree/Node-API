const {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../Controller/authorController");
const {
  createAuthorVld,
  updateAuthorVld,
  deleteAuthorVld,
} = require("../Validation/authorValidation");

module.exports = (app) => {
  app.get("/", getAllAuthors);
  app.post("/create-author", createAuthorVld, createAuthor);
  app.put("/update-author/:id", updateAuthorVld, updateAuthor);
  app.delete("/delete-author/:id", deleteAuthorVld, deleteAuthor);
};
