const router = require("express").Router();
const authRoutes = require("./auth");
const eventsRoutes = require("./events");
const userRoutes = require("./user");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/events", eventsRoutes);
router.use("/user", userRoutes);

module.exports = router;
