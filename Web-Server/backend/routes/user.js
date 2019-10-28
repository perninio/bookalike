const express = require("express");
const router = express.Router();

const database = require("../database/database");
const userUtils = require("../utils/userUtils");

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
      database
        .createUserNode({
          email: email,
          password: hash,
          salt: salt,
          role: "user"
        })
        .then(user => res.status(200).send())
        .catch(err => console.log(err));
    });
});

// @route GET api/user/login
// @desc function which checks if credentials provided are correct if correct it returns email and role
// @access Public
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  userUtils
    .userExists(email)
    .then(user => {
      if (userUtils.checkPassword(user, password)) {
        res.status(200).json({ email: user.email, role: user.role });
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

module.exports = router;
