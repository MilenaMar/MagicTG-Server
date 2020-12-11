const router = require("express").Router();

// ℹ️ Handles password encryption
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the player model in order to interact with the database
const Player = require("../models/Player.model");
const Session = require("../models/Session.model");
const Event = require("../models/Events.model");
const Organizer = require("../models/Organizer.model");

// Require necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");


// router.get("/session", (req, res) => {}
router.get("/", (req, res, next) => {
  Event.find().populate("organizer")
    .populate("players")
    .then((events) => {
      console.log(events.organizer)
      res.json(events);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
  .populate("organizer")
  .populate("player")
  .then((singleEvent) => {
    res.json(singleEvent);
  });
});


router.post("/new", (req, res) => {
  const { name, location, date, maxPlayers, format } = req.body;
  Session.findOne({ _id: req.headers.authorization })
    .populate("organizer")
    .then((session) => {
      return Event.create({
        name,
        location,
        date,
        maxPlayers,
        format,
        organizer: session.organizer,
      });
    })
    .then((event) => {
      return res.json({ event });
    });
});

router.put("/edit/:_id", isLoggedIn, (req, res) => {
  Event.findOneAndUpdate({ _id: req.params._id }, req.body, {
    new: true,
  })
    .then((eventUpdated) => {
      res.json({ message: "all good", eventUpdated });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});


router.post("/:id/attend", (req, res) => {
  Session.findOne({ _id: req.headers.authorization })
    .populate("organizer")
    .then((session) => {
      return Event.create({
        name,
        location,
        date,
        maxPlayers,
        format,
        organizer: session.organizer,
      });
    })
    .then((event) => {
      return res.json({ event });
    });
});
module.exports = router;
