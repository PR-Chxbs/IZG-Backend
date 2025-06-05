const express = require('express');
const { addEvent, getEvents, getEvent, updateEventById, deleteEventById } = require('../controllers/eventController');

const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, addEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', authenticate, updateEventById);
router.delete('/:id', authenticate, deleteEventById);

module.exports = router;
