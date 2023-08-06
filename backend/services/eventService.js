const Event = require('../models/eventModel');
const { ObjectId } = require('mongoose').Types;

module.exports.createEvent = (eventDetails) => {
    return new Promise(function (resolve, reject) {
        const eventDate = new Date(eventDetails.eventDate);
        const currentDate = new Date();


        const event = new Event({
            eventName: eventDetails.eventName,
            eventDate: eventDate,
            eventTime: eventDetails.eventTime,
            eventDescription: eventDetails.eventDescription,
            eventLocation: eventDetails.eventLocation,
            eventImage: eventDetails.eventImage,
            eventStatus: eventDate > currentDate ? 'upcoming' : 'past',
        });


        event.save()
            .then((savedEvent) => resolve(savedEvent))
            .catch((error) => reject(error));
    });
}


module.exports.getAllEvents = () => {
    return new Promise((resolve, reject) => {
      Event.find({})
        .then((events) => resolve(events))
        .catch((error) => reject(error));
    });
  };

  module.exports.updateEventStatusToPast = async () => {
    try {
      const currentDate = new Date();
  
      // Find all events with a date in the past
      const pastEvents = await Event.find({ eventDate: { $lt: currentDate } });
  
      for (const event of pastEvents) {
        event.eventStatus = 'past';
        await event.save();
      }
  
      return pastEvents.length;
    } catch (error) {
      throw error;
    }
  };

  module.exports.updateEvent = (selectedEventId, eventDetails) => {
    return new Promise(function (resolve, reject) {
      const eventDate = new Date(eventDetails.eventDate);
  
      const currentDate = new Date();
      if (eventDate < currentDate) {
        return reject('Event date cannot be in the past');
      }
  
      Event.findOneAndUpdate(
        { _id: new ObjectId(selectedEventId) }, // Find event by _id
        {
          eventName: eventDetails.eventName,
          eventDate: eventDate,
          eventTime: eventDetails.eventTime,
          eventDescription: eventDetails.eventDescription,
          eventLocation: eventDetails.eventLocation,
          eventImage: eventDetails.eventImage,
        },
        { new: true } // Return the updated document
      ) 
        .then((updatedEvent) => {
          if (!updatedEvent) {
            return reject('Event not found');
          }
          resolve(updatedEvent);
        })
        .catch((error) => reject(error));
    });
  };

  module.exports.deleteEvent = (eventId) => {
    return new Promise((resolve, reject) => {
      Event.findOneAndDelete({ _id: new ObjectId(eventId) })
        .then((deletedEvent) => resolve(deletedEvent))
        .catch((error) => reject(error));
    });
  }


