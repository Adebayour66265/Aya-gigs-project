import {
  deleteQuizController,
  getAllQuizController,
  getOneQuizController,
  postQuizController,
  updateQuizController,
} from '../controller/quiz.js'
import express from 'express'

const quizRoute = express.Router()

//post quiz
quizRoute.post('/', postQuizController);
//update quiz
quizRoute.put('/:id', updateQuizController);
//get all quiz
quizRoute.get('/', getAllQuizController);
//get one quiz
quizRoute.get('/:id', getOneQuizController);
//delete quiz
quizRoute.delete('/:id', deleteQuizController);

export default quizRoute
