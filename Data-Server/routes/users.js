const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwtUtils = require("../utils/jwtUtils");
const userUtils = require("../utils/userUtils");
const sequelize = require("sequelize");

const ProfileFactory = require("../factory/ProfileFactory");
const profileFactory = new ProfileFactory();

// @route POST api/user/initialize/:userid
// @desc create user object by server
// @access Public
router.post("/initialize/:userid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      if (data.role == "server" && data.id == "WS") {
        const user = {
          userid: req.params.userid,
          status: "public"
        };
        User.create(user)
          .then(res.status(200).send())
          .catch(err => {
            console.log(err);
            res.status(400).send();
          });
      } else {
        res.status(403).send("Nie serwer");
      }
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route GET api/user/name/:name
// @desc get all users with certain name (check in first and last name)
// @access Public
router.get("/name/:name", (req, res) => {
  const lowerCased = req.params.name.toLowerCase();
  User.findAll({
    limit: 10,
    where: {
      [sequelize.Op.or]: [
        {
          firstname: {
            [sequelize.Op.iLike]: "%" + lowerCased + "%"
          }
        },
        {
          lastname: {
            [sequelize.Op.iLike]: "%" + lowerCased + "%"
          }
        }
      ]
    }
  })
    .then(books => {
      if (books) {
        res.status(200).json({ data: books });
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć książek" });
      }
    })
    .catch(err => console.log(err));
});

// @route GET api/user/:userid
// @desc get data from certain user profile
// @access Public
router.get("/:userid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id, role } = data;
      User.findOne({ where: { userid: req.params.userid } })
        .then(user => {
          if (
            userUtils.isAdmin(role) ||
            userUtils.isOwner(id, user.userid) ||
            userUtils.isServer(role)
          ) {
            const {
              status,
              firstname,
              lastname,
              birthdate,
              description,
              graphic
            } = user;
            const profile = {
              status: status,
              firstname: firstname,
              lastname: lastname,
              birthdate: birthdate,
              description: description,
              graphic: graphic
            };
            res.status(200).json({ data: profile });
          } else {
            const { id } = data;
            axios
              .get(
                "http://" +
                  process.env.WS_IP_ADDR +
                  ":5000/api/user/" +
                  id +
                  "/friends"
              )
              .then(resp => {
                const {
                  data: { friends }
                } = resp;
                const isFriend = friends.includes(id);
                let profile = profileFactory.getProfileData(user, isFriend);
                res.status(200).json({ data: profile });
              })
              .catch(err => {
                console.log(err);
                res.status(500).send();
              });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(403).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route PUT api/user/:userid
// @desc update user's profile data - change can be made from Admin
// @access Private/Admin
router.put("/:userid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id, role } = data;
      if (req.params.userid == id || role == "admin") {
        User.findOne({ where: { userid: req.params.userid } })
          .then(user => {
            user
              .update(req.body.data)
              .then(updatedUser => {
                res.status(200).json({ data: updatedUser });
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err);
            res.status(403).send();
          });
      } else {
        res.status(409).send();
      }
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

module.exports = router;
