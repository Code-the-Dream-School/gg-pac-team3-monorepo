import express from 'express';
import {
  createQuiz,
  getQuiz,
  getAllQuizzesForLesson,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController.mjs';
import { verifyToken, isTeacher } from '../middlewares/verifyToken.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: API to manage quizzes within lessons.
 */

/**
 * @swagger
 * /api/course/{courseId}/{lessonId}/quizzes:
 *   get:
 *     summary: Retrieve a list of quizzes for a lesson
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of quizzes.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Lesson or course not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:courseId/:lessonId/quizzes', verifyToken, getAllQuizzesForLesson);

/**
 * @swagger
 * /api/course/{courseId}/{lessonId}/quiz/{quizId}:
 *   get:
 *     summary: Retrieve a specific quiz
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson
 *         schema:
 *           type: string
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single quiz.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Quiz, lesson, or course not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:courseId/:lessonId/quiz/:quizId', verifyToken, getQuiz);

/**
 * @swagger
 * /api/course/{courseId}/{lessonId}:
 *   post:
 *     summary: Create a new quiz in a lesson
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *               title:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     questionText:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       201:
 *         description: Quiz created successfully.
 *       400:
 *         description: Bad request. Invalid quiz data.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Course or lesson not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/:courseId/:lessonId', verifyToken, isTeacher, createQuiz);

/**
 * @swagger
 * /api/course/{courseId}/{lessonId}/quiz/{quizId}:
 *   patch:
 *     summary: Update a specific quiz
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson
 *         schema:
 *           type: string
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quizId:
 *                 type: string
 *               title:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     questionText:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                     answer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Quiz updated successfully.
 *       400:
 *         description: Bad request. Invalid data provided.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Quiz, lesson, or course not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  '/:courseId/:lessonId/quiz/:quizId',
  verifyToken,
  isTeacher,
  updateQuiz,
);

/**
 * @swagger
 * /api/course/{courseId}/{lessonId}/quiz/{quizId}:
 *   delete:
 *     summary: Delete a specific quiz
 *     tags: [Quizzes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson
 *         schema:
 *           type: string
 *       - in: path
 *         name: quizId
 *         required: true
 *         description: ID of the quiz
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted successfully.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Quiz, lesson, or course not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:courseId/:lessonId/quiz/:quizId',
  verifyToken,
  isTeacher,
  deleteQuiz,
);

export default router;
