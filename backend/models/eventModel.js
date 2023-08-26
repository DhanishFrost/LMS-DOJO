const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,

    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },

    eventDescription: {
        type: String,
        required: true,
    },

    eventLocation: {
        type: String,
        required: true,
    },

    eventStatus: {
        type: String,
        enum: ['upcoming', 'past'], default: 'upcoming' 
    },
    
    eventImage: {
        type: String,
        required: true,
    },


   
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
