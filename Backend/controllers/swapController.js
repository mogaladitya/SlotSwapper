const Event = require("../models/Event");
const SwapRequest = require("../models/SwapRequest");
const mongoose = require("mongoose");

// Get all swappable slots (not mine)
exports.getSwappableSlots = async (req, res) => {
  try {
    const slots = await Event.find({
      status: "SWAPPABLE",
      owner: { $ne: req.user._id },
    }).populate("owner", "fullName email");

    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching slots", error: err.message });
  }
};

// Create a swap request
exports.createSwapRequest = async (req, res) => {
  const { mySlotId, theirSlotId } = req.body;
  if (!mySlotId || !theirSlotId)
    return res.status(400).json({ message: "Missing slot IDs" });

  const mySlot = await Event.findById(mySlotId);
  const theirSlot = await Event.findById(theirSlotId);

  if (!mySlot || !theirSlot)
    return res.status(404).json({ message: "Slot not found" });

  if (!mySlot.owner.equals(req.user._id))
    return res.status(403).json({ message: "You do not own this slot" });

  if (mySlot.status !== "SWAPPABLE" || theirSlot.status !== "SWAPPABLE")
    return res.status(400).json({ message: "Both slots must be swappable" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const swap = await SwapRequest.create(
      [
        {
          requester: req.user._id,
          responder: theirSlot.owner,
          mySlot: mySlot._id,
          theirSlot: theirSlot._id,
        },
      ],
      { session }
    );

    await Event.updateMany(
      { _id: { $in: [mySlot._id, theirSlot._id] } },
      { $set: { status: "SWAP_PENDING" } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Swap request created", swap: swap[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Error creating swap", error: err.message });
  }
};

// Respond to swap (accept/reject)
exports.respondToSwap = async (req, res) => {
  const { accept } = req.body;
  const swap = await SwapRequest.findById(req.params.requestId).populate("mySlot theirSlot");

  if (!swap) return res.status(404).json({ message: "Swap request not found" });
  if (!swap.responder.equals(req.user._id))
    return res.status(403).json({ message: "Not authorized" });
  if (swap.status !== "PENDING")
    return res.status(400).json({ message: "Swap already resolved" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!accept) {
      swap.status = "REJECTED";
      await swap.save({ session });
      await Event.updateMany(
        { _id: { $in: [swap.mySlot, swap.theirSlot] } },
        { $set: { status: "SWAPPABLE" } },
        { session }
      );
      await session.commitTransaction();
      session.endSession();
      return res.json({ message: "Swap rejected", swap });
    }

    // ACCEPTED: swap event owners
    const mySlot = await Event.findById(swap.mySlot._id).session(session);
    const theirSlot = await Event.findById(swap.theirSlot._id).session(session);

    const requesterId = swap.requester;
    const responderId = swap.responder;

    mySlot.owner = responderId;
    theirSlot.owner = requesterId;
    mySlot.status = "BUSY";
    theirSlot.status = "BUSY";

    await mySlot.save({ session });
    await theirSlot.save({ session });

    swap.status = "ACCEPTED";
    await swap.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Swap accepted successfully", swap });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Error responding to swap", error: err.message });
  }
};

// Get all incoming/outgoing requests
exports.getSwapRequests = async (req, res) => {
  try {
    const incoming = await SwapRequest.find({ responder: req.user._id })
      .populate("mySlot theirSlot requester responder");
    const outgoing = await SwapRequest.find({ requester: req.user._id })
      .populate("mySlot theirSlot requester responder");

    res.json({ incoming, outgoing });
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests", error: err.message });
  }
};
