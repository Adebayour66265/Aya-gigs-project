import express from 'express'
import {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controller/Courses.js'
import { addQuestion, deleteQuestion, getAllQuestions, getOneQuestion, updateQuestion } from '../controller/Questions.js'
import { deleteQuiz, getAllQuizForCourse, getOneQuizForCourse, postQuiz, updateQuiz } from '../controller/quiz.js'

const courseRoutes = express.Router()

// Create a new course
courseRoutes.post('/', addCourse)

// Get all courses
courseRoutes.get('/', getAllCourses)

// Get a single course
courseRoutes.get('/:id', getCourse)

// Update an existing course
courseRoutes.put('/:id', updateCourse)

// Delete a course
courseRoutes.delete('/:id', deleteCourse)

//Post quiz in a course
courseRoutes.post('/:id/quizzes', postQuiz);

//Update quiz in  a course
courseRoutes.put('/:courseId/quizzes/:quizId', updateQuiz);

//Get all quizzes for a course
courseRoutes.get('/:courseId/quizzes', getAllQuizForCourse);

//Get one quiz for a course
courseRoutes.get('/:courseId/quizzes/:quizId', getOneQuizForCourse);

//Delete quiz in a course
courseRoutes.delete('/:courseId/quizzes/:quizId', deleteQuiz);

//add questions for a quiz
courseRoutes.post('/:courseId/quizzes/:quizId/questions', addQuestion);

//update question for a quiz
courseRoutes.put('/:courseId/quizzes/:quizId/questions/:questionId', updateQuestion);

//get all questions for a quiz
courseRoutes.get('/:courseId/quizzes/:quizId/questions', getAllQuestions);

//get one question for a quiz
courseRoutes.get('/:courseId/quizzes/:quizId/questions/:questionId', getOneQuestion);

//delete question for a quiz
courseRoutes.delete('/:courseId/quizzes/:quizId/questions/:questionId', deleteQuestion);

export default courseRoutes
