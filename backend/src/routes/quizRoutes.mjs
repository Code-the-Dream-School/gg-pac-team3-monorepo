import express from 'express';
import { createQuiz, getQuiz, getAllQuizzesForLesson, updateQuiz, deleteQuiz } from '../controllers/quizController.mjs';
import { verifyToken, isTeacher } from '../middlewares/verifyToken.mjs';

const router = express.Router();

// Route to create a quiz for a specific lesson
router.post('/:courseId/:lessonId', verifyToken, isTeacher, createQuiz);

// Route to get a specific quiz by ID
router.get('/:courseId/:lessonId/quiz/:quizId', verifyToken, getQuiz);

// Route to get all quizzes for a specific lesson
router.get('/:courseId/:lessonId/quizzes', verifyToken, getAllQuizzesForLesson);

// Route to update a specific quiz by ID
router.patch('/:courseId/:lessonId/quiz/:quizId', verifyToken, isTeacher, updateQuiz);

// Route to delete a specific quiz by ID
router.delete('/:courseId/:lessonId/quiz/:quizId', verifyToken, isTeacher, deleteQuiz);

export default router;
