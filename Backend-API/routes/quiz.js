import express from 'express'
import { deleteQuiz, getAllQuizForCourse, getOneQuizForCourse, postQuiz, updateQuiz } from '../controller/quiz.js';

const quizRoute = express.Router()

//Post quiz in a course
quizRoute.post('/:id/quizzes', postQuiz);
//Update quiz in  a course
quizRoute.put('/:courseId/quizzes/:quizId', updateQuiz);
//Get all quizzes for a course
quizRoute.get('/:courseId/quizzes', getAllQuizForCourse);
//Get one quiz for a course
quizRoute.get('/:courseId/quizzes/:quizId', getOneQuizForCourse);
//Delete quiz in a course
quizRoute.delete('/:courseId/quizzes/:quizId', deleteQuiz);

export default quizRoute
