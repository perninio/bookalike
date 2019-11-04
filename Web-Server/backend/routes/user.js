const express = require("express");
const router = express.Router();
const axios = require("axios");

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
        axios
          .get(
            "http://" + process.env.DS_IP_ADDR + ":5000/api/user/" + user.userid
          )
          .then(resp => {
            const { data } = resp.data;
            const payload = {
              id: user.userid,
              role: user.role,
              status: user.status,
              profile: data
            };
            res.status(200).json({ data: payload });
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({
              server:
                "Nie można się połączyć z serwerem DS, proszę spróbować później"
            });
          });
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
    .then(() => {
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
        .then(user => {
          axios
            .post(
              "http://" +
                process.env.DS_IP_ADDR +
                ":5000/api/user/initialize/" +
                user.userid
            )
            .then(() => {
              emailUtils
                .sendEmail(email, account_code)
                .then(() => {
                  res.status(200).send();
                })
                .catch(err => {
                  database.deleteUserByEmail(email);
                  res.status(409).json({ email: err });
                });
            })
            .catch(err => {
              console.log(err);
              database.deleteUserByEmail(email);
              //TODO: send to DS delete user by id
              res.status(400).json({
                server:
                  "Nie można się połączyć z serwerem DS, proszę spróbować później"
              });
              return;
            });
        })
        .catch(err => console.log(err));
    });
});

// @route GET api/user/activate/:confirmation-code
// @desc endpoint which takes confirmation code and checks it with database confirmation code
// @access Public
router.post("/activate/:confirmationCode", (req, res) => {
  const { id } = req.body;

  userUtils
    .findUserById(id)
    .then(user => {
      if (userUtils.checkCode(user, req.params.confirmationCode)) {
        userUtils
          .changeAccountData(user, { status: "activated" })
          .then(user => {
            axios
              .get(
                "http://" +
                  process.env.DS_IP_ADDR +
                  ":5000/api/user/" +
                  user.userid
              )
              .then(resp => {
                const { data } = resp.data;
                const payload = {
                  id: user.userid,
                  role: user.role,
                  status: user.status,
                  profile: data
                };
                res.status(200).json({ data: payload });
              })
              .catch(err => {
                console.log(err);
                res.status(400).json({
                  server:
                    "Nie można się połączyć z serwerem DS, proszę spróbować później"
                });
              });
          })
          .catch(err => console.log(err));
      } else {
        res.status(404).json({ activateCode: "Kod nieprawidłowy" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(404)
        .json({ email: "Użytkownik o podanym emailu nie istnieje" });
    });
});

module.exports = router;
