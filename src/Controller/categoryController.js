const categoryModal = require("../Model/categoryModal");

module.exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const setCategoryData = new categoryModal({
      name: name,
    });
    await setCategoryData.save();
    res.status(200).send({
      message: "Set New Category!",
      data: setCategoryData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while creating category!",
      error: error,
    });
  }
};

module.exports.removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategoryData = await categoryModal.findByIdAndRemove(id);
    res.status(200).send({
      message: "Remove Category!",
      data: deleteCategoryData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while creating category!",
      error: error,
    });
  }
};

module.exports.getAllCategoryDetails = async (req, res) => {
  try {
    const getAllCategoryData = await categoryModal.find();
    res.status(200).send({
      message: "Category All Data",
      data: getAllCategoryData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Category Record Not Found",
      error: error,
    });
  }
};

module.exports.getCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const getCategoryData = await categoryModal.findById(id);
    res.status(200).send({
      message: "Category Record",
      data: getCategoryData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Category Record Not Found",
      error: error,
    });
  }
};

module.exports.updateCategoryDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, } = req.body;
      const updateCategoryData = await categoryModal.findById(id);
      updateCategoryData.name = name;
      await updateCategoryData.save();
      res.status(200).send({
        message: "Record Updated!",
        record: updateCategoryData,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error ocured",
        error: error,
      });
    }
  };