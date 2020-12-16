const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image:{
      type: String,
    },

    date: {
      type: Date,
      required: true,
    },

    completed: Boolean,

    maxPlayers: Number,

    format: { type: String, enum: ["Legacy", "Modern", "Pioner", "Standard"] },

    organizer: [{ type: Schema.Types.ObjectId, ref: "Organizer" }],

    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],

    lat: String,

    long: String,
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
