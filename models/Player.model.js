const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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

    avatar: String,

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
