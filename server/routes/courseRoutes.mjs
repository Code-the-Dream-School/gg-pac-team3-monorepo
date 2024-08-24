import express from 'express';
import { createCourse, getAllCourses, getTeacherCourses, getCourse, updateCourse, deleteCourse } from '../controllers/courseController.mjs';
import { verifyToken, isTeacher } from '../middlewares/verifyToken.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API to manage courses.
 */

/**
 * @swagger
 * /api/course/public:
 *   get:
 *     summary: Retrieve a list of all courses (public access)
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses.
 *       500:
 *         description: Internal server error.
 */
router.get('/public', getAllCourses);

/**
 * @swagger
 * /api/course/teacher_courses:
 *   get:
 *     summary: Retrieve a list of courses created by teacher (requires authentication)
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get('/teacher_courses', verifyToken, getTeacherCourses);

/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Retrieve a list of courses (requires authentication)
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get('/', verifyToken, getAllCourses);

/**
 * @swagger
 * /api/course/{uid}:
 *   get:
 *     summary: Retrieve a specific course
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single course.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Course not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:uid', verifyToken, getCourse);

/**
 * @swagger
 * /api/course:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               courseName:
 *                 type: string
 *               courseType:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *               rating:
 *                 type: number
 *               otherInfo:
 *                 type: string
 *               videoLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Course created successfully.
 *       400:
 *         description: Bad request. Invalid course data.
 *       403:
 *         description: Forbidden. Only teachers can create courses.
 *       500:
 *         description: Internal server error.
 */
router.post('/', verifyToken, isTeacher, createCourse);

/**
 * @swagger
 * /api/course/{uid}:
 *   patch:
 *     summary: Update a specific course
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *               courseName:
 *                 type: string
 *               courseType:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *               duration:
 *                 type: string
 *               rating:
 *                 type: number
 *               otherInfo:
 *                 type: string
 *               videoLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *       400:
 *         description: Bad request. Invalid data provided.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: Course not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:uid', verifyToken, isTeacher, updateCourse);

/**
 * @swagger
 * /api/course/{uid}:
 *   delete:
 *     summary: Delete a specific course
 *     tags: [Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully.
 *       403:
 *         description: Forbidden. Only teachers can delete courses.
 *       404:
 *         description: Course not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:uid', verifyToken, isTeacher, deleteCourse);

export default router;
