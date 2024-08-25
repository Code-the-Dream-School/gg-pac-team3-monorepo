import express from 'express';
import {
  createLesson,
  getLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
} from '../controllers/lessonController.mjs';
import { verifyToken, isTeacher } from '../middlewares/verifyToken.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: API to manage lessons within courses.
 */

/**
 * @swagger
 * /api/course/{courseId}/lessons:
 *   get:
 *     summary: Retrieve a list of lessons for a course
 *     tags: [Lessons]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of lessons.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Course not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:courseId/lessons', verifyToken, getAllLessons);

/**
 * @swagger
 * /api/course/{courseId}/lesson/{lessonId}:
 *   get:
 *     summary: Retrieve a specific lesson
 *     tags: [Lessons]
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
 *         description: A single lesson.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Lesson or course not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:courseId/lesson/:lessonId', verifyToken, getLesson);

/**
 * @swagger
 * /api/course/{courseId}:
 *   post:
 *     summary: Create a new lesson in a course
 *     tags: [Lessons]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lessonId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: object
 *                 properties:
 *                   overview:
 *                     type: string
 *                   details:
 *                     type: string
 *               points:
 *                 type: number
 *               order:
 *                 type: number
 *               videoUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               materials:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lesson created successfully.
 *       400:
 *         description: Bad request. Invalid lesson data.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Course not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/:courseId', verifyToken, isTeacher, createLesson);

/**
 * @swagger
 * /api/course/{courseId}/lesson/{lessonId}:
 *   patch:
 *     summary: Update a specific lesson
 *     tags: [Lessons]
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
 *               lessonId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: object
 *                 properties:
 *                   overview:
 *                     type: string
 *                   details:
 *                     type: string
 *               points:
 *                 type: number
 *               order:
 *                 type: number
 *               videoUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               materials:
 *                 type: string
 *     responses:
 *       200:
 *         description: Lesson updated successfully.
 *       400:
 *         description: Bad request. Invalid data provided.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Lesson or course not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  '/:courseId/lesson/:lessonId',
  verifyToken,
  isTeacher,
  updateLesson,
);

/**
 * @swagger
 * /api/course/{courseId}/lesson/{lessonId}:
 *   delete:
 *     summary: Delete a specific lesson
 *     tags: [Lessons]
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
 *         description: Lesson deleted successfully.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Lesson or course not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:courseId/lesson/:lessonId',
  verifyToken,
  isTeacher,
  deleteLesson,
);

export default router;
