const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    launch_date: {
      type: String,
      default: null,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authors",
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    number_of_sales: {
      type: Number,
      default: 0,
    },
    genre: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const bookModal = mongoose.model("Books", bookSchema);
module.exports = bookModal;
