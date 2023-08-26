const { ObjectId } = require('mongodb');
const Submission = require('../models/SubmissionModel'); 

module.exports.createSubmission = (submissionDetails) => {
    return new Promise(function (resolve, reject) {

        const submission = new Submission({
            submissionName: submissionDetails.submissionName,
            submissionFile: submissionDetails.submissionFile,
            Activity_ID: submissionDetails.Activity_ID,
            studentEmail: submissionDetails.studentEmail,
            submissionStatus: submissionDetails.submissionStatus,
            
          
        });
        submission.save()
            .then((savedSubmission) => resolve(savedSubmission))
            .catch((error) => reject(error));
    });
}

module.exports.getAllSubmissions = () => {
    return new Promise((resolve, reject) => {
        Submission.find({})
            .then((submissions) => resolve(submissions))
            .catch((error) => reject(error));
        }
    );
}




module.exports.getSubmissionsByActivity = (Activity_ID) => {
    return new Promise((resolve, reject) => {
        Submission.find({ Activity_ID: Activity_ID })
            .then((submissions) => resolve(submissions))
            .catch((error) => reject(error));
    }); 
}

module.exports.deleteSubmission = (submissionId) => {
    return new Promise((resolve, reject) => {
        Submission.findOneAndDelete({_id : new ObjectId(submissionId)})
            .then((deletedsubmission) => resolve(deletedsubmission))
            .catch((error) => reject(error));
    });
}
