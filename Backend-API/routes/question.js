import express from "express";
import { addQuestion, deleteQuestion, getAllQuestions, getOneQuestion, updateQuestion } from "../controller/Questions.js";

const questionRoute = express.Router();

questionRoute.post('/:quizId/questions/add', addQuestion);
questionRoute.put('/:quizId/questions/:questionId', updateQuestion);
questionRoute.get('/:quizId/questions', getAllQuestions);
questionRoute.get('/:quizId/questions/:questionId', getOneQuestion);
questionRoute.delete('/:quizId/questions/:questionId', deleteQuestion);


export default questionRoute;