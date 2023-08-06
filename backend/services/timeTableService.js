const Timetable = require('../models/timeTableModel');

module.exports.getClassTimetables = async (studentClass) => {
    try {
      const timetables = await Timetable.find({ class: studentClass });
      return timetables;
    } catch (error) {
      throw error;
    }
  };
  