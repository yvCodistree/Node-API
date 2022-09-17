const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

const categoryModal = mongoose.model("Categories", categorySchema);
module.exports = categoryModal;
