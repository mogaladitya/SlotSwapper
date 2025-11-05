const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/auth');

const {
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

router.get('/', protect, getMyEvents);
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
