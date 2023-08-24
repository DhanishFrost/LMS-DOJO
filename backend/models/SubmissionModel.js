const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,

    submissionName: {
        type: String,
        required: true,
    },


    submissionFile:{
        type: String,
        required: true,
    },

    Activity_ID:{
        type: String,
        ref: 'Activity',
        required: true,
    },

    submissionStatus: {
        type: String,
        default: 'Pending',

    },

    studentEmail:{
        type: String,
        required: true,
    }




});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;