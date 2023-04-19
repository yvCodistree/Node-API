const authorRoute = require("../authorRoute");
const bookRoute = require("../bookRoute");
const categoryRoute = require("../categoryRoute");
const productRoute = require("../productRoute");

module.exports = (app) => {
  app.prefix("/category", categoryRoute);
  app.prefix("/product", productRoute);
  app.prefix("/author", authorRoute);
  app.prefix("/book", bookRoute);
};
