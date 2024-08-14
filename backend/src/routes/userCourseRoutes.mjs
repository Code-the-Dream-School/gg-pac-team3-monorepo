import express from 'express';
import { enrollInCourse, getUserCourses } from '../controllers/userCourseController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

// Route to enroll in a course
router.post('/user/:userId/course/:courseId/enrollment', verifyToken, enrollInCourse);

// Route to get courses for a specific user
router.get('/user/:userId/course', verifyToken, getUserCourses);

export default router;
