const mongoose = require("mongoose");

const SwapRequestSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who initiated
    responder: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who owns the other slot
    mySlot: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // my event
    theirSlot: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true }, // their event
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SwapRequest", SwapRequestSchema);
