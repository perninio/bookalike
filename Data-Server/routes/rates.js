const express = require("express");
const router = express.Router();

const Rate = require("../models/Rate");
const jwtUtils = require("../utils/jwtUtils");

router.get("/", (req, res) => {
  Rate.findAll()
    .then(rates => {
      if (rates) {
        res.status(200).json({ data: rates });
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć książek" });
      }
    })
    .catch(err => console.log(err));
});

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

      Rate.create(newRate)
        .then(res.status(200).send())
        .catch(err => {
          console.log(err);
          res.status(400).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

module.exports = router;
