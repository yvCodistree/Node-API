const {
  createNewProduct,
  updateProductDetails,
  deleteProductDetails,
  getProductDetails,
  getAllProductDetails,
  getProduct,
} = require("../Controller/productController");
const {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../Validation/productValidation");

module.exports = (app) => {
  app.get("/", getAllProductDetails);

  app.get("/get-product-list", getProduct);

  app.get("/:id", getProductDetails);

  app.post("/create-product", createProductValidator, createNewProduct);

  app.put("/update-product/:id", updateProductValidator, updateProductDetails);

  app.delete(
    "/remove-product/:id",
    deleteProductValidator,
    deleteProductDetails
  );
};
