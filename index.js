require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routev1 = require("./src/Router/v1");

express.application.prefix = express.Router.prefix = function (
  path,
  configure
) {
  const router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};

mongoose.connect("mongodb+srv://codistree:codistree123@codistree.hjw12di.mongodb.net/training", {
  useNewUrlParser: true,
});

var app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.status(200).send({
    message: "This Is Home Page",
    data: [],
  });
});

app.prefix("/api/v1", routev1);

app.use((req, res) => {
  res.status(404).send({
    message: "Record Not Found",
  });
});

app.listen(8000, () => {
  console.log("Example app is listening at http://localhost:8000");
});

module.exports = app;
