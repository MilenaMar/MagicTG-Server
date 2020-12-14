const router = require("express").Router();

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the player model in order to interact with the database
const Player = require("../models/Player.model");
const Session = require("../models/Session.model");
const Event = require("../models/Events.model");
const Post = require("../models/Post.model");

// Require necessary middlewares in order to control access to specific routes
const isLoggedIn = require("../middlewares/isLoggedIn");

// router.get("/session", (req, res) => {}
router.get("/", (req, res, next) => {
  Event.find()
    .populate("organizer")
    .populate("players")
    .then((events) => {
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
  const { name, location, date, maxPlayers, format, lat, long } = req.body;
  Session.findOne({ _id: req.headers.authorization })
    .populate("organizer")
    .then((session) => {
      return Event.create({
        name,
        location,
        date,
        maxPlayers,
        format,
        lat,
        long,
        organizer: session.organizer,
      });
    })
    .then((event) => {
      return res.json({ event });
    });
});

router.put("/edit/:_id", isLoggedIn, (req, res) => {
  Event.findOneAndUpdate(req.params._id, req.body, {
    new: true,
  })
    .then((eventUpdated) => {
      res.json({ message: "all good", eventUpdated });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err.message });
    });
});

router.post("/:id/attend", (req, res) => {
  Session.findOne({ _id: req.headers.authorization })
    .populate("player")
    .then((session) => {
      return Event.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { players: session.player } },
        { new: true }
      );
    })
    .then((event) => {
      return res.json({ event });
    });
});

router.post("/:id/unattend", (req, res) => {
  Session.findOne({ _id: req.headers.authorization })
    .populate("player")
    .then((session) => {
      return Event.findByIdAndUpdate(
        req.params.id,
        { $pull: { players: session.player } },
        { new: true }
      );
    })
    .then((event) => {
      return res.json({ event });
    });
});

router.delete("/delete/:id", (req, resp) => {
  Event.deleteOne({ _id: req.params.id }).then((deletedEvent) => {
    resp.json("deleted event");
  });
});

router.get("/:username/events", (req, resp) => {
  Player.findOne({ username: req.params.username }).then((player) => {
    Event.find({ players: player }).then((events) => {
      return resp.json(events);
    });
  });
});

/////// Section for comments ///////

//router.post("/addcomment", (req, res) => {
//  Session.findOne({ _id: req.headers.authorization })
//    .populate("player")
//    .then((session) => {
//      return Event.findByIdAndUpdate( req.params.id, { $pull: { players: session.player}}, {new:true});
//    })
//    .then((event) => {
//      return res.json({ event });
//    });
//});

module.exports = router;
