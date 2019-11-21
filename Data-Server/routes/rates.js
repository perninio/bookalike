const express = require("express");
const router = express.Router();

const Rate = require("../models/Rate");
const jwtUtils = require("../utils/jwtUtils");

// @route GET api/rates/
// @desc get all rates for user
// @access Private/Server
router.get("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id, role } = data;
      if (role === "user" || role === "admin") {
        Rate.findAll({ where: { userid: id } })
          .then(rates => {
            if (rates) {
              res.status(200).json({ data: rates });
            } else {
              res.status(404).json({ rates: "Nie masz żadnych ocen" });
            }
          })
          .catch(err => console.log(err));
      } else {
        Rate.findAll()
          .then(rates => {
            if (rates) {
              res.status(200).json({ data: rates });
            } else {
              res.status(404).send();
            }
          })
          .catch(err => {
            console.log(err);
            res.status(404).send();
          });
      }
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route GET api/rates/book/:bookid
// @desc get user rate for a specific book
// @access Private
router.get("/book/:bookid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      Rate.findOne({ where: { userid: id, bookid: req.params.bookid } })
        .then(rate => {
          if (rate) {
            res.status(200).json({ data: rate });
          } else {
            res.status(404).json({ rate: "Nie masz oceny dla tej książki" });
          }
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route POST api/rates/
// @desc post a rate for a book, or update currently existing one - it's a bad practice
// @access Private
router.post("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { bookid, rate } = req.body;
      const { id } = data;
      const newRate = { userid: id, bookid: bookid, rate: rate };
      Rate.findOne({ where: { userid: id, bookid: bookid } })
        .then(rate => {
          if (rate) {
            rate
              .update(newRate)
              .then(res.status(200).send())
              .catch(err => {
                console.log(err);
                res.status(400).send();
              });
          } else {
            Rate.create(newRate)
              .then(res.status(200).send())
              .catch(err => {
                console.log(err);
                res.status(400).send();
              });
          }
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route DELETE api/rates/book/:bookId
// @desc delete certain rate for {userid,bookid} if it exists
// @access Private
router.delete("/book/:bookId", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      Rate.findOne({ where: { userid: id, bookid: req.params.bookId } })
        .then(rate => {
          if (rate) {
            rate
              .destroy()
              .then(res.status(200).send())
              .catch(err => {
                console.log(err);
                res.status(400).send();
              });
          } else {
            res.status(404).send();
          }
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

module.exports = router;
