const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwtUtils = require("../utils/jwtUtils");
const userUtils = require("../utils/userUtils");

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
      res.status(400).send();
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

// @route GET api/user/:userid
// @desc get data from certain user profile
// @access Public
router.get("/:userid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).send();
    } else {
      const { id, role } = data;
      User.findOne({ where: { userid: req.params.userid } })
        .then(user => {
          if (userUtils.isAdmin(role) || userUtils.isOwner(id, user.userid)) {
            res.status(200).json({ data: user });
          } else {
            let profile = profileFactory.getProfileData(user);
            res.status(200).json({ data: profile });
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

module.exports = router;
