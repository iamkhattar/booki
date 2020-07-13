const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Extract token from the header
  const token = req.header("x-auth-token");

  //If the token does not exist send an 401 Error
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //If the token exists, verify it
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};
