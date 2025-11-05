const Event = require('../models/Event');

// Get all events for logged-in user
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user._id }).sort({ startTime: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    if (!title || !startTime || !endTime)
      return res.status(400).json({ message: 'All fields required' });

    const event = await Event.create({
      title,
      startTime,
      endTime,
      owner: req.user._id,
      status: 'BUSY'
    });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, owner: req.user._id });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const fields = ['title', 'startTime', 'endTime', 'status'];
    fields.forEach(f => {
      if (req.body[f] !== undefined) event[f] = req.body[f];
    });

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
