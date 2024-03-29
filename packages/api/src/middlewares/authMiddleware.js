const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

module.exports = (type) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "token not provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ message: "token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "token malformed" });
  }

  jwt.verify(token, authConfig[type], (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "token invalid" });
    }

    req.userId = decoded.id;
    req.userType = type;
    return next();
  });
};
