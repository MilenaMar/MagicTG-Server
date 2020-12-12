const router = require("express").Router();
const bcrypt = require("bcryptjs"); 

// Require necessary middlewares in order to control access to specific routes
const isLoggedIn = require("../middlewares/isLoggedIn");

const Player = require("../models/Player.model");
const Events = require("../models/Events.model");

////// Player Profile//////////////////////
router.get("/:id", (req, res) => {
  Player.findOne({ username: req.params.id })
    .then((user) => {
      return res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

//

router.put("/:id/edit-profile",isLoggedIn, (req, res) => {
  Player.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then((userUpdated) => {
      res.json({ message: "all good", userUpdated });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});


////-----------------UpdatePassword-------------------------------///
//
router.post("/:id/update-password", (req, res) => {
  const {newPassword} = req.body;
  const hash = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, hash);
  Player.findOneAndUpdate(
    req.params.id,
    { password: hashedPassword },
    { new: true }
  ).then((updatedUser) => {
    res.json({ message: "all good", updatedUser });
    });
  });

module.exports = router;
