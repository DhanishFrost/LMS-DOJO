const eventService = require('../services/eventService');
const path = require('path');

const createEvent = async (req, res) => {
    try {

        if (!req.file.filename) {
            return res.status(400).json({ status: false, message: 'No eventImage file provided' });
        }
        console.log(req.file.filename);
        const eventData = {
            eventName: req.body.eventName,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            eventDescription: req.body.eventDescription,
            eventLocation: req.body.eventLocation,
            eventImage: req.file.filename,
        };
        const status = await eventService.createEvent(eventData);

        if (status) {
            res.status(200).json({ status: true, message: 'Event created successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error creating event' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'An error occurred while creating the event' });
    }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    const eventsWithFullImageURL = events.map(event => ({
      ...event._doc,
      eventImage: `${req.protocol}://${req.get('host')}/frontend/assets/images/${event.eventImage}`
    }));
    res.status(200).json({ status: true, data: eventsWithFullImageURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'An error occurred while fetching events' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventData = {
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      eventDescription: req.body.eventDescription,
      eventLocation: req.body.eventLocation,
      eventImage: req.file.filename,
    };

    const updatedEvent = await eventService.updateEvent(req.params.selectedEventId, eventData);
    console.log(updatedEvent)
    if (updatedEvent) {
      return res.status(200).json({ message: 'Event updated successfully', updatedEvent });
    } else {
      return res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    // Handle any errors that occurred during the update process
    console.error('Error updating event:', error);
    return res.status(500).json({ message: 'An error occurred while updating the event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await eventService.deleteEvent(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ message: 'An error occurred while deleting the event' });
  }
};


module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };
