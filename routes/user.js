const router = require("express").Router();

// ℹ️ Handles password encryption
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the player model in order to interact with the database
const Player = require("../models/Player.model");
const Organizer = require("../models/Player.model");
const Session = require("../models/Session.model");

// Require necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/:username", (req, res, next) => {
  Player.findById(req.params.id);
});
