const express = require("express");
const router = express.Router();

const database = require("../database/database");
const userUtils = require("../utils/userUtils");
const emailUtils = require("../utils/emailUtils");

// @route GET api/user/login
// @desc endpoint which checks if credentials provided are correct if correct it returns email and role
// @access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  userUtils
    .userExists(email)
    .then(user => {
      if (userUtils.checkPassword(user, password)) {
        res
          .status(200)
          .json({ email: user.email, role: user.role, status: user.status });
      } else {
        res.status(404).json({ password: "Podane hasło jest nieprawidłowe" });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ email: "Użytkownik o podanym emailu nie istnieje" });
    });
});

// @route GET api/user/register
// @desc register an user
// @access Public
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  userUtils
    .userExists(email)
    .then(user => {
      res
        .status(409)
        .json({ email: "Ktoś zarejestrował już się z podanego adresu" });
    })
    .catch(err => {
      const { salt, hash } = userUtils.getHashAndSalt(password);
      const account_code = userUtils.createAccountCode(email);
      database
        .createUserNode({
          email: email,
          password: hash,
          salt: salt,
          status: "unactivated",
          account_code: account_code,
          role: "user"
        })
        .then(() => {
          emailUtils
            .sendEmail(email, account_code)
            .then(resp => {
              res.status(200).send();
            })
            .catch(err => {
              database.deleteUserByEmail(email);
              res.status(409).json({ email: err });
            });
        })
        .catch(err => console.log(err));
    });
});

// @route GET api/user/confirmation/:confirmation-code
// @desc endpoint which takes
// @access Public

module.exports = router;
