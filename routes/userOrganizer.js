const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

const Organizer = require("../models/Organizer.model");
const Events = require("../models/Events.model");

////// Player Profile//////////////////////
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Organizer.findOne({username: req.params.id})
    .then((user) => {
      console.log(user);
      return res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});


module.exports = router;
