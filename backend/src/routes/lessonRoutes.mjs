import express from 'express';
import { createLesson, getLesson, getAllLessons, updateLesson, deleteLesson } from '../controllers/lessonController.mjs';
import { verifyToken, isTeacher } from '../middlewares/verifyToken.mjs';

const router = express.Router();

// Create a new lesson in a course
router.post('/:courseId', verifyToken, isTeacher, createLesson);

// Fetch all lessons in a course
router.get('/:courseId/lessons', verifyToken, getAllLessons);

// Fetch a specific lesson by ID
router.get('/:courseId/lesson/:lessonId', verifyToken, getLesson);

// Update a lesson by ID
router.patch('/:courseId/lesson/:lessonId', verifyToken, isTeacher, updateLesson);

// Delete a lesson by ID
router.delete('/:courseId/lesson/:lessonId', verifyToken, isTeacher, deleteLesson);

export default router;
