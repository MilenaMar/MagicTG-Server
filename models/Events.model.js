const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: Date,
      required: true,
    },

    completed: Boolean,

    maxPlayers: Number,

    format: { type: String, enum: ["Legacy", "Modern", "Pioner", "Standar"] },

    organizer: [{ type: Schema.Types.ObjectId, ref: "Organizer" }],

    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
