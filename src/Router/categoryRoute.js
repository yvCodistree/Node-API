const {
  createCategory,
  removeCategory,
  getAllCategoryDetails,
  getCategoryDetails,
  updateCategoryDetails,
} = require("../Controller/categoryController");
const {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
} = require("../Validation/categoryValidation");

module.exports = (app) => {
  app.get("/", getAllCategoryDetails);

  app.get("/:id", getCategoryDetails);

  app.post("/create-category", createCategoryValidator, createCategory);

  app.put("/update-category/:id", updateCategoryValidator, updateCategoryDetails);

  app.delete("/remove-category/:id", deleteCategoryValidator, removeCategory);
};
