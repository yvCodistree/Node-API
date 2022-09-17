const categoryRoute = require("../categoryRoute");
const productRoute = require("../productRoute");

module.exports = (app) => {
  app.prefix("/category", categoryRoute);
  app.prefix("/product", productRoute);
};
