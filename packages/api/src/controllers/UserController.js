const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const bcrypt = require("bcryptjs");
const { User } = require("../models/UserModel");

const expirationToken = 30; //days

exports.getNewToken = async (req, res) => {
  const user = await User.findById(req.userId);
  const token = jwt.sign({ id: user.id }, authConfig[user.type], {
    expiresIn: 86400 * expirationToken,
  });
  return res.send({ user, token });
};

exports.createUser = async (req, res) => {
  const { name, password, type, whatsapp } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    if (type && type !== "purchaser") {
      return res.status(400).send({
        message: "invalid user type",
      });
    }

    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }

    if (!name) {
      return res.status(400).send({ message: "name is required" });
    }

    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }

    if (!whatsapp) {
      return res.status(400).send({ message: "whatsapp is required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).send({ message: "email already registered" });
    }

    const user = await User.create(req.body);
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig[user.type], {
      expiresIn: 86400 * expirationToken,
    });

    return res.send({ user, token });
  } catch (e) {
    return res
      .status(400)
      .send({ message: "registration failed", error: e.message });
  }
};

exports.login = async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "invalid password" });
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig[user.type], {
      expiresIn: 86400 * expirationToken,
    });

    return res.send({ user, token });
  } catch (e) {
    return res.status(400).send({ message: "login failed", error: e.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { email, name, password, type } = req.body;
  try {
    if (type !== "admin") {
      return res.status(400).send({
        message: "invalid user type",
      });
    }

    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }

    if (!name) {
      return res.status(400).send({ message: "name is required" });
    }

    if (!password) {
      return res.status(400).send({ message: "password is required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).send({ message: "email already registered" });
    }

    const user = await User.create(req.body);
    user.password = undefined;

    return res.send({ user });
  } catch (e) {
    return res
      .status(400)
      .send({ error: "registration failed", message: e.message });
  }
};
