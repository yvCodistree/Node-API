const bookModal = require("../Model/book");

module.exports.getBooks = async (req, res) => {
  try {
    const getAllBookData = await bookModal.find().populate("author_id");
    res.status(200).send({
      message: "Book All Data",
      data: getAllBookData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Book Record Not Found",
      error: error,
    });
  }
};

module.exports.createBook = async (req, res) => {
  try {
    const {
      name,
      author_id,
      launch_date,
      description,
      genre,
      number_of_sales,
    } = req.body;
    const setBookData = await new bookModal({
      name,
      author_id,
      launch_date,
      description,
      genre,
      number_of_sales,
    });
    await setBookData.save();
    await setBookData.populate("author_id");
    res.status(200).send({
      message: "Book Created!",
      data: setBookData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while creating book!",
      error: error,
    });
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const {
      name,
      author_id,
      launch_date,
      description,
      genre,
      number_of_sales,
    } = req.body;
    const bookData = req.book;
    if (bookData) {
      bookData.name = name;
      bookData.author_id = author_id;
      bookData.launch_date = launch_date;
      bookData.description = description;
      bookData.genre = genre;
      bookData.number_of_sales = number_of_sales;
      await bookData.save();
      await bookData.populate("author_id");
      res.status(200).send({
        message: "Book Updated!",
        data: bookData,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while updating book!",
      error: error,
    });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const bookData = req.book;
    if (bookData) {
      await bookModal.findByIdAndDelete(bookData._id);
    }
    res.status(200).send({
      message: "Book Deleted!",
      data: bookData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while deleting book!",
      error: error,
    });
  }
};

module.exports.getBookByAuthor = async (req, res) => {
  try {
    const books = req.books;
    res.status(200).send({
      message: "Book By Author",
      data: books,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while getting book!",
      error: error,
    });
  }
};

module.exports.getBooksList = async (req, res) => {
  try {
    const search = req.query.search || "";
    const getAllBookData = await bookModal.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "author_id",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $match: {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { "author.name": { $regex: search, $options: "i" } },
          ],
        },
      },
    ]);
    console.log(getAllBookData);
    res.status(200).send({
      message: "Book All Data",
      data: getAllBookData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Book Record Not Found",
      error: error,
    });
  }
};
