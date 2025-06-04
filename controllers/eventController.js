const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../models/eventModel');

const addEvent = async (req, res) => {
  try {
    const event = req.body;
    event.user_id = req.user.user_id; // from auth middleware
    const newEvent = await createEvent(event);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

const fetchEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

const fetchEvent = async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
};

const updateEventById = async (req, res) => {
  try {
    const updated = await updateEvent(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

const deleteEventById = async (req, res) => {
  try {
    await deleteEvent(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};

module.exports = {
  addEvent,
  fetchEvents,
  fetchEvent,
  updateEventById,
  deleteEventById,
};
