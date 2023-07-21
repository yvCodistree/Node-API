const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
bookSchema.plugin(paginate);
bookSchema.plugin(aggregatePaginate);
const bookModal = mongoose.model("Books", bookSchema);
module.exports = bookModal;
