const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const bcrypt = require("bcryptjs");
const { User } = require("../models/UserModel");

exports.createUser = async (req, res) => {
  const { email, name, password, type } = req.body;
  try {
    if (type && type !== "purchaser") {
      return res.status(400).send({
        error: "invalid user type"
      });
    }

    if (!email) {
      return res.status(400).send({ error: "email is required" });
    }

    if (!name) {
      return res.status(400).send({ error: "name is required" });
    }

    if (!password) {
      return res.status(400).send({ error: "password is required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "email already registered" });
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
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
      expiresIn: 86400 * 30
    });

    return res.send({ user, token });
  } catch (e) {
    return res.status(400).send({ error: "login failed", message: e.message });
  }
};

exports.createAdmin = async (req, res) => {
  const { email, name, password, type } = req.body;
  try {
    if (type !== "admin") {
      return res.status(400).send({
        error: "invalid user type"
      });
    }

    if (!email) {
      return res.status(400).send({ error: "email is required" });
    }

    if (!name) {
      return res.status(400).send({ error: "name is required" });
    }

    if (!password) {
      return res.status(400).send({ error: "password is required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "email already registered" });
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
