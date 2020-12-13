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

    date: {
      type: Date,
      required: true,
    },

    completed: Boolean,

    maxPlayers: Number,

    format: { type: String, enum: ["Legacy", "Modern", "Pioner", "Standard"] },

    organizer: [{ type: Schema.Types.ObjectId, ref: "Organizer" }],

    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
