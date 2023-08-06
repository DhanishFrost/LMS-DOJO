const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  class: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    
  },
  time: {
    type: String,
    
  },
  subject: {
    type: String,
    
  },
  teacher: {
    type: String,
    
  },
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
