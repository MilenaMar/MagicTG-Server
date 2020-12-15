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

////// Organizer Profile//////////////////////
router.get("/:id", (req, res) => {
  Organizer.findOne({ username: req.params.id })
    .then((user) => {
      return res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

router.put("/:username/edit-profile", isLoggedIn, (req, res) => {
  Organizer.findOne({ username:req.body.username}).then((found) => {
    if (found) {
      return res.status(400).json({ errorMessage: "Username already taken." });
    }
  return Organizer.findOneAndUpdate({ username: req.params.username }, req.body, {
    new: true,
  })
    .then((userUpdated) => {
      res.json({ message: "all good", userUpdated });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
  })
});

router.get("/:username/events", (req, resp) => {
  Organizer.findOne({ username: req.params.username }).then((organizer) => {
    Events.find({ organizer: organizer }).then((events) => {
      return resp.json(events);
    });
  });
});

module.exports = router;
