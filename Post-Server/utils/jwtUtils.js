const jwt = require("jsonwebtoken");

function verifyToken(token, publickey) {
  try {
    return jwt.verify(token, publickey);
  } catch (e) {
    return { error: e.name };
  }
}

module.exports = { verifyToken };
