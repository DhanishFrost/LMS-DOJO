const { model } = require('mongoose');
const Activity = require('../models/activityModel');
const { request } = require('express');

const Submission = require('../models/SubmissionModel');
const { ObjectId } = require('mongoose').Types;


module.exports.createActivity = async (activityDetails) => {


    try {
        return new Promise((resolve, reject) => {

        const activity = new Activity({
            activityName: activityDetails.activityName,
            activityDescription: activityDetails.activityDescription,
            dueDate: activityDetails.dueDate,
            submissiontime : activityDetails.submissiontime,
            //activityImage: activityDetails.activityImage,
            //class: activityDetails.class,
            forclasses: activityDetails.forclasses,
            submissionLink: activityDetails.submissionLink,
            downloadLink: activityDetails.downloadLink,
            submissionGrade: activityDetails.submissionGrade,
            feedback: activityDetails.feedback,
            createdBy: activityDetails.createdBy,
            Activity_ID: activityDetails.Activity_ID,
            ActivityselectedSubjects: activityDetails.ActivityselectedSubjects
            
        });

        activity.save()
            .then((savedActivity) => resolve(savedActivity))    
            .catch((error) => reject(error));

        } 
    )} catch (error) {
        throw error;

        
    
    };
};


module.exports.getAllActivities = () => {
    return new Promise((resolve, reject) => {
        Activity.find({})
            .then((activities) => resolve(activities))
            .catch((error) => reject(error));
        });
    };



module.exports.getActivitiesPerTeacher = async (Currentemail) => {
    return new Promise((resolve, reject) => {
        Activity.find({ createdBy: Currentemail })
            .then((activities) => resolve(activities))
            .catch((error) => reject(error));
        });
    }


    module.exports.getActivitiesPerClass = async (studentClass) => {
        return new Promise((resolve, reject) => {
            Activity.find({ forclasses: studentClass })
                .then((activities) => resolve(activities))
                .catch((error) => reject(error));
            });
        }







module.exports.deleteActivity = (activityId) => {
    return new Promise((resolve, reject) => {
        Activity.findOneAndDelete({ _id : new ObjectId(activityId)})
            .then((deletedActivity) => resolve(deletedActivity))
            .catch((error) => reject(error));
    }
    );
}


module.exports.updateActivity = (selectedActivityId, activityDetails) => {
    return new Promise(function (resolve, reject) {
    
        Activity.findOneAndUpdate(
            { _id: new ObjectId(selectedActivityId) }, // Find event by _id
            
            {
                activityName: activityDetails.activityName,
                activityDescription: activityDetails.activityDescription,
                dueDate: activityDetails.dueDate,
                submissiontime : activityDetails.submissiontime,
                //activityImage: activityDetails.activityImage,
                //class: activityDetails.class,
                forclasses: activityDetails.forclasses,
                submissionLink: activityDetails.submissionLink,
                downloadLink: activityDetails.downloadLink,
                submissionGrade: activityDetails.submissionGrade,
                feedback: activityDetails.feedback,
                createdBy: activityDetails.createdBy,
                Activity_ID: activityDetails.Activity_ID,
                submissionStatus: activityDetails.submissionStatus,
                
            },
            { new: true } // To return updated document
        )
            .then((updatedActivity) => {
                if (!updatedActivity) {
                    return reject('Activity not found');
                }
                resolve(updatedActivity);
            }
            )
            .catch((error) => reject(error));
    });
};





 
  