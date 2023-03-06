import express from 'express'
import {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controller/Courses.js'

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

export default courseRoutes
