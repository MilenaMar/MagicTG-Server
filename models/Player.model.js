const { Schema, model } = require("mongoose");


const playerSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
     
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dwttlckdr/image/upload/v1607625756/kisspng-magic-the-gathering-playing-card-magic-points-car-gathering-5ad98d821a5537.8380805815242069781079_lri7cg.png",
    },
   

    location: String,

    userType: {
      type: String,
      default: "Player",
    },
  },
  {
    timestamps: true,
  }
);

const Player = model("Player", playerSchema);

module.exports = Player;
