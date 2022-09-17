const productModal = require("../Model/productModal");

module.exports.createNewProduct = async (req, res) => {
  try {
    const { name, color, quantity, price, description, category } = req.body;
    const addProductData = new productModal({
      name: name,
      color: color,
      quantity: quantity,
      price: price,
      description: description,
      category: category,
    });
    await addProductData.save();
    res.status(200).send({
      message: "New Products Inserted!",
      data: addProductData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured!",
      error: error,
    });
  }
};

module.exports.updateProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, quantity, price, description, category } = req.body;
    const updateProductData = await productModal.findById(id);
    updateProductData.name = name;
    updateProductData.color = color;
    updateProductData.quantity = quantity;
    updateProductData.price = price;
    updateProductData.description = description;
    updateProductData.category = category;
    await updateProductData.save();
    res.status(200).send({
      message: "Record Updated!",
      record: updateProductData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured",
      error: error,
    });
  }
};

module.exports.deleteProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProductData = await productModal.findByIdAndRemove(id);
    res.status(200).send({
      message: "Record Deleted!",
      data: deleteProductData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured!",
      error: error,
    });
  }
};

module.exports.getAllProductDetails = async (req, res) => {
  try {
    const getAllProductData = await productModal
      .find()
      .populate("category", "_id name");
    res.status(200).send({
      message: "Product All Data",
      data: getAllProductData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message: "Products Record Not Found",
      error: error,
    });
  }
};

module.exports.getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const getProdutData = await productModal.findById(id);
    res.status(200).send({
      message: "Product Record",
      data: getProdutData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Product Record Not Found",
      error: error,
    });
  }
};

module.exports.getProduct = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const extra = category !== "" ? { category: category } : {};
    const getProductData = await productModal.paginate(
      {
        ...extra,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { color: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      },
      {
        page: page,
        limit: limit,
      }
    );
    res.status(200).send({
      message: "member record",
      data: getProductData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message: "Error ocured",
      error: error,
    });
  }
};
