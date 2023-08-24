const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,



    quizName: {
        type: String,
        required: true,

    },


    SingleQuestion: [{
        question: {
            type: String,
            required: true,
        },
        options : [{
            type: String,
            required: true,
        }], 

        correctAnswer: {
            type: String,
            required: true,
        }


       
    }],

   

});


const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
