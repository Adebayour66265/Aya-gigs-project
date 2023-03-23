import express from 'express';
import { getAllCourses, getCourse, addCourse, updateCourse, deleteCourse } from '../controller/Courses.js';

const courseRoutes = express.Router();

// Get all courses
courseRoutes.get('/all', getAllCourses);

// Get a single course
courseRoutes.get('/get/:id', getCourse);

// Create a new course
courseRoutes.post('/add', addCourse);

// Update an existing course
courseRoutes.put('/:id', updateCourse);

// Delete a course
courseRoutes.delete('/:id', deleteCourse);

export default courseRoutes;
