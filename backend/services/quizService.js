const Quiz = require('../models/quizModel');
const { ObjectId } = require('mongoose').Types;


module.exports.createQuiz = (quizDetails) => {

    return new Promise(function (resolve, reject) {
        const quiz = new Quiz({
            quizName: quizDetails.quizName,
            SingleQuestion: quizDetails.SingleQuestion,

        });

        quiz.save()
            .then((savedQuiz) => resolve(savedQuiz))
            .catch((error) => reject(error));
    });
}


module.exports.getQuiz = (quizId) => {
    return new Promise(function (resolve, reject) {
        Quiz.find({  })
            .then((quizzes) => resolve(quizzes))
            .catch((error) => reject(error));
    });
}
