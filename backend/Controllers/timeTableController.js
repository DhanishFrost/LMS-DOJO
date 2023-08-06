const timeTableService = require('../services/timeTableService');

var getClassTimetables = async (req, res) => {
    try {
      const studentClass = req.params.studentClass;
      const timetables = await timeTableService.getClassTimetables(studentClass);
      res.status(200).json({ status: true, data: timetables });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  };

module.exports = { getClassTimetables };