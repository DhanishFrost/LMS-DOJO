const quizService = require('../services/quizService');
const path = require('path');


const createQuiz = async (req, res) => {
    try {
        const quizData = {
            quizName: req.body.quizName,
            SingleQuestion: req.body.SingleQuestion,

        };
        const status = await quizService.createQuiz(quizData);

        if (status) {
            res.status(200).json({ status: true, message: 'Quiz created successfully' });
        } else {
            res.status(400).json({ status: false, message: 'Error creating quiz' });
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}

const getQuiz = async (req, res) => {
    try {
        
        const quiz = await quizService.getQuiz();
        res.status(200).json({ status: true, data : quiz });
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
}


module.exports = { createQuiz , getQuiz }