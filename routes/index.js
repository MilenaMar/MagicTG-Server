const router = require("express").Router();
const authRoutes = require("./auth");
const playerRoutes = require("./userPlayer");
const organizerRoutes = require("./userOrganizer");
const eventRoutes = require("./events");
//const eventsRoutes = require("./events");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/user/player", playerRoutes);
router.use("/user/organizer", organizerRoutes);
router.use("/event", eventRoutes);


module.exports = router;
