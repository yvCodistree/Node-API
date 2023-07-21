const authorModal = require("../Model/authorModal");

module.exports.getAllAuthors = async (req, res) => {
  try {
    const user = req.user;
    const getAllAuthorsData = await authorModal.find({ user: user._id });
    res.status(200).send({
      message: "Author All Data",
      data: getAllAuthorsData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while getting author!",
      error: error,
    });
  }
};

module.exports.createAuthor = async (req, res) => {
  try {
    const { name, birthDate, country } = req.body;
    const setAuthorData = await new authorModal({
      name,
      birthDate,
      country,
      user: req.user._id,
    });
    await setAuthorData.save();
    res.status(200).send({
      message: "Author Created!",
      data: setAuthorData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while creating author!",
      error: error,
    });
  }
};

module.exports.updateAuthor = async (req, res) => {
  try {
    const { name, birthDate, country } = req.body;
    const authorData = req.author;
    if (authorData) {
      authorData.name = name;
      authorData.birthDate = birthDate;
      authorData.country = country;
      await authorData.save();
      res.status(200).send({
        message: "Author Updated!",
        data: authorData,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while updating author!",
      error: error,
    });
  }
};

module.exports.deleteAuthor = async (req, res) => {
  try {
    const authorData = req.author;
    if (authorData) {
      await authorModal.findByIdAndDelete(authorData._id);
    }
    res.status(200).send({
      message: "Author Deleted!",
      data: authorData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while deleting author!",
      error: error,
    });
  }
};
