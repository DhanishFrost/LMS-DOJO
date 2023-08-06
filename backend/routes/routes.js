const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
var userController = require('../Controllers/userController');
var eventController = require('../Controllers/eventController');
var timeTableController = require('../Controllers/timeTableController');
const authorize = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: '../frontend/assets/images/' });


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});


// Admin

router.get('/admin/admin-dashboard', authorize('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/admin-dashboard.html'));
});

router.get('/admin/manage-students', authorize('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/manage-students.html'));
});

router.get('/admin/manage-teachers', authorize('admin'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/manage-teachers.html'));
});

// Teacher

router.get('/teacher/teacher-dashboard', authorize('teacher'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/teacher/teacher-dashboard.html'));
});

router.get('/primary-student/primary-student-dashboard', authorize('pStudent'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/student/pStudent/pStudent-dashboard.html'));
});

router.get('/lower-secondary-student/lower-secondary-student-dashboard', authorize('lsStudent'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/student/lsStudent/lsStudent-dashboard.html'));
});

router.get('/upper-secondary-student/upper-secondary-student-dashboard', authorize('usStudent'), (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/student/usStudent/usStudent-dashboard.html'));
});

//Admin routes

router.route('/user/login').post(userController.login);
router.route('/admin/getStudentUsers').get(userController.getStudentUsers);
router.route('/admin/getTeacherUsers').get(userController.getTeacherUsers);
router.route('/admin/getAdminUsers').get(userController.getAdminUsers);
router.route('/admin/createUser').post(userController.createUser);
router.route('/admin/updateUser/:email').put(userController.updateUser);
router.route('/admin/deleteUser/:email').delete(userController.deleteUser);

//Event Route

router.post('/event/createEvent', upload.single('eventImage'), eventController.createEvent);
router.get('/event/getAllEvents', eventController.getAllEvents);
router.put('/event/updateEvent/:selectedEventId', upload.single('eventImage'), eventController.updateEvent);
router.delete('/event/deleteEvent/:eventId', eventController.deleteEvent);

// Timetable Routes

router.get('/timetable/getClassTimetables/:studentClass', timeTableController.getClassTimetables);

module.exports = router;