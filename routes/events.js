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
const { isValidObjectId } = require("mongoose");

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

router.get("/allcomments/:id", (req,res) => {
  Event.find({_id:req.params.id}).then((event)=>{
    Post.find({event:event}).then((posts) => {
      return res.json(posts);
     }) 
  }).catch((err) => console.log(err))
});


router.get("/:id", (req, res) => {
  Event.findById(req.params.id)
    .populate("organizer")
    .populate("players")
    .then((singleEvent) => {
      res.json(singleEvent);
    }).catch((err) => {
      res.status(500).json({ errorMessage: err.message });
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
  Event.findOneAndUpdate({_id:req.params._id}, req.body, {
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
    }).catch((err) => console.log(err))
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
    }).catch((err) => console.log(err))
});

router.delete("/delete/:id", (req, resp) => {
  Event.deleteOne({ _id: req.params.id }).then((deletedEvent) => {
    resp.json("deleted event");
  }).catch((err) => console.log(err));
});

router.get("/:username/events", (req, resp) => {
  Player.findOne({ username: req.params.username }).then((player) => {
    Event.find({ players: player }).then((events) => {
      return resp.json(events);
    });
  }).catch((err) => console.log(err))
});

/////// Section for comments ///////

router.post("/addcomment", (req, res) => {
  const {comment,username,eventInfo} = req.body
Event.findById({_id:eventInfo}).then((event)=> {
  Post.create({ body:comment, author:username, event:event})
  .then((post) => {
      return res.json({ post })
   })
  })
    .catch((err) => console.log(err))
});




module.exports = router
