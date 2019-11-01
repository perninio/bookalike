const database = require("../database/database");
const crypto = require("crypto");

async function userExists(email) {
  return await database
    .findUserByEmail(email)
    .then(user => {
      return user;
    })
    .catch(err => {
      throw err;
    });
}

function checkPassword(user, password) {
  hash = createHash(password, user.salt);
  return user.password === hash;
}

function getHashAndSalt(password) {
  let salt = createRandomSalt();
  let hash = createHash(password, salt);

  return {
    salt: salt,
    hash: hash
  };
}

function createRandomSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function createAccountCode(email) {
  return crypto
    .createHash("sha256")
    .update(email, "utf8")
    .digest()
    .toString("hex")
    .substring(0, 6);
}

function createHash(password, salt) {
  hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash;
}

module.exports = {
  userExists,
  checkPassword,
  getHashAndSalt,
  createAccountCode
};
