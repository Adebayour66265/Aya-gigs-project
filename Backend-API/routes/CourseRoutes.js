import express from 'express';
import { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/Courses.js';

const courseRoutes = express.Router();

// Get all courses
courseRoutes.get('/', getAllCourses);

// Get a single course
courseRoutes.get('/:id', getCourse);

// Create a new course
courseRoutes.post('/', createCourse);

// Update an existing course
courseRoutes.put('/:id', updateCourse);

// Delete a course
courseRoutes.delete('/:id', deleteCourse);

export default courseRoutes;
