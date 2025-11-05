const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const {
  getSwappableSlots,
  createSwapRequest,
  respondToSwap,
  getSwapRequests,
} = require("../controllers/swapController");

// Fetch all available swappable slots (not mine)
router.get("/swappable-slots", protect, getSwappableSlots);

// Create a new swap request
router.post("/swap-request", protect, createSwapRequest);

// Respond (accept/reject) to a swap
router.post("/swap-response/:requestId", protect, respondToSwap);

// View incoming & outgoing swap requests
router.get("/requests", protect, getSwapRequests);

module.exports = router;
