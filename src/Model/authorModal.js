const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    birthDate: {
      type: String,
      default: null,
    },
    country: {
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

const authorModal = mongoose.model("Authors", authorSchema);
module.exports = authorModal;
