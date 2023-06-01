const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = 8;

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

user.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

user.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

const userModal = mongoose.model("Users", user);
module.exports = userModal;
