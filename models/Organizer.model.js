const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const organizerSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const Organizer = model("Organizer", organizerSchema);

module.exports = Player;
