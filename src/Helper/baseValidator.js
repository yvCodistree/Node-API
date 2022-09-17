const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(422).send({
      Success: "False",
      Error: err,
    });
    return;
  }
  next();
};
