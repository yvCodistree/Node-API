const jwt = require("jsonwebtoken");
const userModal = require("../Model/user");
const jwtSecret =
  "th7eS6mSSrAeK7n7k4vNiwiQDevZclj4IwhYbSwf9f63aKW_ceZ7iM8HNRVLCU6PfmKEZuJX0YbJKz9BOw-32gLzpWBgzF9lwJCXl20ZhFoIElFd5MskFWbhFSWqNfyhe_oksHe-veudx1FHrPAW9vhIscex8qAHWuZxRPfSkcW8OmlGZ7DRM50Wlcm-7mhGv3289Dt5Kctu5EDBRE4VS2FNWT7Ze16SmqoVKuC5qOpwyZ3T3YJbQk4z0dKnT65qUhla6i3rC5sC4xLYRCu_OfaZC1dMlEO_BWz6jTw-C8LXQXEhkPZcxfx302luTppkwefnBBigM_MfeFaeO8hLYQ";

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const signupData = await userModal.create({
      name: name,
      email: email,
      password: password,
    });
    signupData.password = undefined;
    res.status(200).send({
      message: "User Signup Successfully!",
      data: signupData,
      status: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while creating user!",
      error: error,
      status: false,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = req.loginUser;
    const token = await jwt.sign(
      { id: user._id.toString(), email: user.email },
      jwtSecret,
      {
        expiresIn: "7d",
      }
    );
    user.password = undefined;
    res.status(200).send({
      message: "User Login Successfully!",
      data: user,
      token,
      status: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while login!",
      error: error,
      status: false,
    });
  }
};

module.exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({
      message: "User Profile!",
      data: user,
      status: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error ocured while login!",
      error: error,
      status: false,
    });
  }
};
