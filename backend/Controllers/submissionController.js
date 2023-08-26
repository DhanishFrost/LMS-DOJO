const submissionService = require('../services/submissionService');
const path = require('path');

const createSubmission = async (req, res) => {
    try {

        if (!req.body.submissionFile) {
            return res.status(400).json({ status: false, message: 'No submissionFile file provided' });
        }
        
        console.log(req.body.submissionFile);
        console.log(req.body);
         const submissionData = {
            submissionName: req.body.submissionName,
            submissionFile: req.body.submissionFile,
            Activity_ID: req.body.Activity_ID,
            studentEmail: req.body.studentEmail,
            submissionStatus: req.body.submissionStatus,
          
        };
        const status = await submissionService.createSubmission(submissionData);

        if (status) {
            res.status(200).json({ status: true, message: 'Submission created successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error creating submission' });
        }
    } catch (error) {
        console.error(error);
       res.status(500).json({ status: false, message: `An error occurred while creating the submission` });
      
    }
}   




const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await submissionService.getAllSubmissions();
        res.status(200).json({ status: true, data: submissions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'An error occurred while fetching submissions' });
    }
};






const getSubmissionsByActivity = async (req, res) => {
    try {
        const submissions = await submissionService.getSubmissionsByActivity(req.params.Activity_ID);
        res.status(200).json({ status: true, data: submissions });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'An error occurred while fetching submissions' });
    }
}


const deleteSubmission = async (req, res) => {
    try {
        const submissionId = req.params.submissionId;
        const deletedsubmission = await submissionService.deleteSubmission(submissionId);
        if(deletedsubmission) {
            res.status(200).json({ status: true, message: 'Submission deleted successfully' , deletedsubmission });
        }
        else {
            res.status(400).json({ status: false, message: 'Error deleting submission' });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'An error occurred while deleting the submission' });
    }
}



module.exports = { createSubmission , getAllSubmissions , getSubmissionsByActivity , deleteSubmission};