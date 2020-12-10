const router = require("express").Router();
const authRoutes = require("./auth");
const playerRoutes = require("./userPlayer.js");
const organizerRoutes = require("./userOrganizer.js");
const eventsRoutes = require("./events");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/player", playerRoutes);
router.use("/organizer", organizerRoutes);

module.exports = router;
