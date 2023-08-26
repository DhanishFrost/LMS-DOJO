const Subject = require('../models/subjectModel');
const { ObjectId } = require('mongoose').Types;

module.exports.createSubject = (subjectDetails) => {
    return new Promise(function (resolve, reject) {
        const subject = new Subject({
            subjectName: subjectDetails.subjectName,
            subjectCode: subjectDetails.subjectCode,
        });
        subject.save()
            .then((savedSubject) => resolve(savedSubject))
            .catch((error) =>{
                if (error.name === 'ValidationError') {
                    // Handle validation errors
                    const validationErrors = {};
                    for (const field in error.errors) {
                        validationErrors[field] = error.errors[field].message;
                        console.log(validationErrors);
 
                    }
                    reject({ validationErrors });
                } else {
                    reject(error);
                }}
            );
    });
}   


module.exports.getAllSubjects = () => {
    return new Promise((resolve, reject) => {
        Subject.find({})
            .then((subjects) => resolve(subjects))
            .catch((error) => reject(error));
        }
    );
};

module.exports.updateSubject = (selectedSubjectId, subjectDetails) => {
    return new Promise((resolve, reject) => {

        Subject.findOneAndUpdate(
            { _id: new ObjectId(selectedSubjectId) },
             {subjectName: subjectDetails.subjectName,
             subjectCode: subjectDetails.subjectCode,
            },
            { new: true }
            )
            .then((updatedSubject) => {
                if(!updatedSubject) {
                    return reject({ status: false, message: 'No subject found with this id' }); 
                }
                return resolve({ status: true, message: 'Subject updated successfully' });

            })
            .catch((error) => reject(error));
    });
}

module.exports.deleteSubject = (subjectId) => {
    return new Promise((resolve, reject) => {
        Subject.findOneAndDelete({ _id: new ObjectId(subjectId) })
            .then((deletedSubject) => resolve(deletedSubject))
            .catch((error) => reject(error));
    });
}
