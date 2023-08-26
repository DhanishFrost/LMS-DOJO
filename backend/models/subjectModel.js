const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,

    subjectName: {
        type: String,
        required: true,
        unique: true,
    },

    subjectCode: {
        type: String,
        required: true,
        unique: true,
        validate : {
            validator : function(v) {
                return /^[A-Z]{2}[0-9]{4}$/.test(v);
            },
            message : props => `${props.value} is not a valid subject code!`
        }
    },


}
);


const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;