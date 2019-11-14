const jwt = require("jsonwebtoken");

function verifyToken(token, publickey) {
  try {
    return jwt.verify(token, publickey);
  } catch (e) {
    return { error: "Invalid signature" };
  }
}

module.exports = { verifyToken };
