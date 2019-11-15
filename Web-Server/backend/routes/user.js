const express = require("express");
const router = express.Router();
const axios = require("axios");

const database = require("../database/database");
const userUtils = require("../utils/userUtils");
const jwtUtils = require("../utils/jwtUtils");
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
            console.log(err.data);
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

// @route POST api/user/register
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
    .catch(() => {
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

// @route PUT api/user/:userid
// @desc endpoint where we can update user's data - changes can be made by admins
// @access Private/Admin
router.put("/:userid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      console.log(data.error);
      res.status(400).json({ error: data.error });
    } else {
      const { id, role } = data;
      updateData = req.params.data;
      if (req.params.userid == id || role == "admin") {
        userUtils.updateAccountData(user, updateData).then(user => {
          res.status(200).json({ data: user });
        });
      } else {
        res.status(409).send();
      }
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route POST api/user/activate/:confirmation-code
// @desc endpoint which takes confirmation code and checks it with database confirmation code
// @access Public
router.post("/activate/:confirmationCode", (req, res) => {
  const { id } = req.body;

  userUtils
    .findUserById(id)
    .then(user => {
      if (userUtils.checkCode(user, req.params.confirmationCode)) {
        userUtils
          .updateAccountData(user, { status: "activated" })
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

// @route GET api/user/init-admin
// @desc initialize admin
// @access Public
router.get("/init-admin", (req, res) => {
  userUtils
    .userExists("admin")
    .then(res.status(406).send())
    .catch(() => {
      const { salt, hash } = userUtils.getHashAndSalt("admin");
      database
        .createUserNode({
          email: "admin",
          password: hash,
          salt: salt,
          status: "activated",
          account_code: "123456",
          role: "admin"
        })
        .then(user => {
          axios
            .post(
              "http://" +
                process.env.DS_IP_ADDR +
                ":5000/api/user/initialize/" +
                user.userid
            )
            .then(() => {})
            .catch(err => {
              console.log(err);
              database.deleteUserByEmail(email);
              res.status(400).json({
                server:
                  "Nie można się połączyć z serwerem DS, proszę spróbować później"
              });
              return;
            });
        });
    });
});

// @route GET api/user/
// @desc get all users
// @access Admin
router.get("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      if (data.role == "admin") {
        database.getAllUsers().then(users => {
          res.status(200).json({ data: users });
        });
      } else {
        res.status(403).send("Nie serwer");
      }
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

module.exports = router;
