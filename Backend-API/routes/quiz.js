import express from 'express'
import { deleteQuiz, getAllQuizForCourse, getOneQuizForCourse, postQuiz, updateQuiz } from '../controller/quiz.js';

const quizRoute = express.Router()

//post quiz in a course
quizRoute.post('/:id/quizzes', postQuiz);
//update quiz in  a course
quizRoute.put('/:courseId/quizzes/:quizId', updateQuiz);
//get all quizzes for a course
quizRoute.get('/:courseId/quizzes', getAllQuizForCourse);
//get one quiz for a course
quizRoute.get('/:courseId/quizzes/:quizId', getOneQuizForCourse);
//delete quiz in a course
quizRoute.delete('/:courseId/quizzes/:quizId', deleteQuiz);

export default quizRoute
