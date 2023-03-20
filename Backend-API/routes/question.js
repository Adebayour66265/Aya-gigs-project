import express from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getOneQuestion, updateQuestion } from "../controller/Questions.js";

const questionRoute = express.Router();

questionRoute.post('/{courseId}/quizzes/{quizId}/questions', addQuestion);
questionRoute.put('/:courseId/quizzes/:quizId/questions/:questionId', updateQuestion);
questionRoute.get('/:courseId/quizzes/:quizId/questions', getAllQuestions);
questionRoute.get('/:courseId/quizzes/:quizId/questions/:questionId', getOneQuestion);
questionRoute.delete('/:courseId/quizzes/:quizId/questions/:questionId', deleteQuestion);


export default questionRoute;