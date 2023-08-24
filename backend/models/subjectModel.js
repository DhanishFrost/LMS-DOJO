const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,

    subjectName: {
        type: String,
        required: true,
    },

    subjectCode: {
        type: String,
        required: true,
    },


}
);


const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;