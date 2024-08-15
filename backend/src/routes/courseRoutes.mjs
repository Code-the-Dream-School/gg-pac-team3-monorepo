import express from 'express';
import { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } from '../controllers/courseController.mjs';
import { verifyToken, isTeacher } from '../middlewares/verifyToken.mjs';

const router = express.Router();

// Route to get all courses in frontpage- No token required for public access
router.get('/public', getAllCourses);

// Route to get all courses
router.get('/', verifyToken, getAllCourses);

// Route to get course data by course ID
router.get('/:uid', verifyToken, getCourse);

// Route for creating a course
router.post('/', verifyToken, isTeacher, createCourse);

// Route for deleting a course by course ID
router.delete('/:uid', verifyToken, isTeacher, deleteCourse);

// Route for updating a course
router.patch('/:uid', verifyToken, isTeacher, updateCourse);

export default router;
