const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');

var activityController = require('../Controllers/activityController');
var userController = require('../Controllers/userController');
var eventController = require('../Controllers/eventController');
var timeTableController = require('../Controllers/timeTableController');
var submissionController = require('../Controllers/submissionController');  
var subjectController = require('../Controllers/subjectController');
var quizController = require('../Controllers/quizController');
const authorize = require('../middleware/auth');
const multer = require('multer');
//const submissionModel = require('../models/submissionModel');
const upload = multer({ dest: '../frontend/assets/images/' });

const SubmissionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null , path.join( "./submissionUploads"))
  },
  filename: (req, file, cb) => {
      cb(null , `${Date.now()}-${file.originalname}`)
  }

});

const SubmissionUpload = multer({ storage : SubmissionStorage ,
  limits: {
    fileSize:  2 * 1024 * 1024 * 1024
   },

})

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


//Classes Route
router.route('/user/getAllClasses/:email').get(userController.getAllClasses);



//Event Route

router.post('/event/createEvent', upload.single('eventImage'), eventController.createEvent);
router.get('/event/getAllEvents', eventController.getAllEvents);
router.put('/event/updateEvent/:selectedEventId', upload.single('eventImage'), eventController.updateEvent);
router.delete('/event/deleteEvent/:eventId', eventController.deleteEvent);


//Activity route

router.post('/activity/createActivity', activityController.createActivity);
router.get('/activity/getAllactivities' , activityController.getAllActivities);
router.get('/activity/getActivitiesPerTeacher/:Currentemail', activityController.getActivitiesPerTeacher);
router.get('/activity/getActivitiesPerClass/:studentClass', activityController.getActivitiesPerClass);
router.put('/activity/updateActivity/:selectedActivityId', activityController.updateActivity);
router.delete('/activity/deleteActivity/:activityId', activityController.deleteActivity);
//router.post('/activity/updateSubmissionStatus', activityController.updateSubmissionStatus);


//submission Routes
router.post('/uploads', SubmissionUpload.single('submissionFile'), submissionController.createSubmission);
router.get('/uploads/getAllSubmissions', submissionController.getAllSubmissions);
router.get('/uploads/download/:id', submissionController.download);
router.get('/uploads/getSubmissionsByActivity/:Activity_ID', submissionController.getSubmissionsByActivity);
router.delete('/uploads/deleteSubmission/:submissionId', submissionController.deleteSubmission);
// Timetable Routes

router.get('/timetable/getClassTimetables/:studentClass', timeTableController.getClassTimetables);



//subject routes
router.post('/subject/createSubject' , subjectController.createSubject);
router.get('/subject/getAllSubjects' , subjectController.getAllSubjects);
router.put('/subject/updateSubject/:selectedSubjectId', subjectController.updateSubject);
router.delete('/subject/deleteSubject/:subjectId', subjectController.deleteSubject);

//quiz route
router.post('/quiz/createQuiz', quizController.createQuiz);
router.get('/quiz/getQuiz', quizController.getQuiz);

module.exports = router;