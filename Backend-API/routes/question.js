import { addQuestion, deleteQuestion, getAllQuestions, getOneQuestion, updateQuestion } from "../controller/question.js";
import express from "express";

const questionRoute = express.Router();

questionRoute.post('/', addQuestion);
questionRoute.put('/:id', updateQuestion);
questionRoute.get('/', getAllQuestions);
questionRoute.get('/:id', getOneQuestion);
questionRoute.delete('/:id', deleteQuestion);


export default questionRoute;