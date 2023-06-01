const authorRoute = require("../authorRoute");
const bookRoute = require("../bookRoute");
const categoryRoute = require("../categoryRoute");
const productRoute = require("../productRoute");
const userRoute = require("../userRoute");

module.exports = (app) => {
  app.prefix("/category", categoryRoute);
  app.prefix("/product", productRoute);
  app.prefix("/author", authorRoute);
  app.prefix("/book", bookRoute);
  app.prefix("/user", userRoute);
};
