const paginate = require("mongoose-paginate-v2");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Categories",
    },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(paginate);
productSchema.plugin(aggregatePaginate);
const productModal = mongoose.model("Product", productSchema);
module.exports = productModal;
