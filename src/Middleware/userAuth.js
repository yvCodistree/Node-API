const jwt = require("jsonwebtoken");
const userModal = require("../Model/user");
const jwtSerect =
  "th7eS6mSSrAeK7n7k4vNiwiQDevZclj4IwhYbSwf9f63aKW_ceZ7iM8HNRVLCU6PfmKEZuJX0YbJKz9BOw-32gLzpWBgzF9lwJCXl20ZhFoIElFd5MskFWbhFSWqNfyhe_oksHe-veudx1FHrPAW9vhIscex8qAHWuZxRPfSkcW8OmlGZ7DRM50Wlcm-7mhGv3289Dt5Kctu5EDBRE4VS2FNWT7Ze16SmqoVKuC5qOpwyZ3T3YJbQk4z0dKnT65qUhla6i3rC5sC4xLYRCu_OfaZC1dMlEO_BWz6jTw-C8LXQXEhkPZcxfx302luTppkwefnBBigM_MfeFaeO8hLYQ";

module.exports.userAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token || token === undefined || token === null) {
      return res.status(401).send({
        status: false,
        message: "Token Not Provided",
      });
    }
    const decode = jwt.verify(token, jwtSerect);
    if (!decode) {
      return res.status(401).send({
        status: false,
        message: "Token Not Valid",
      });
    }
    const user = await userModal.findOne({ _id: decode.id });
    if (!user) {
      return res.status(401).send({
        status: false,
        message: "User Not Found",
      });
    }
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({
      status: false,
      message: "Token Not Valid",
    });
  }
};
