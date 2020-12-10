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

    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dwttlckdr/image/upload/v1607628671/kisspng-magic-the-gathering-puzzle-quest-decal-logo-mag-app-mtg-life-counter-5b843063b844f4.4176460915353897957548-removebg-preview_vfqpae.png",
    },

    location: String,

    userType: {
      type: String,
      default: "Organizer",
    },
  },
  {
    timestamps: true,
  }
);

const Organizer = model("Organizer", organizerSchema);

module.exports = Organizer;
