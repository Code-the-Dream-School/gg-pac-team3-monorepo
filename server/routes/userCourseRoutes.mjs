import express from 'express';
import {
  enrollInCourse,
  getSuggestedCoursesForUser,
  getUserCourses,
  getCoursesForUser,
  CreateUserCourses,
} from '../controllers/userCourseController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Courses
 *   description: API to manage user enrollments in courses.
 */

/**
 * @swagger
 * /api/user/{userId}/course:
 *   get:
 *     summary: Retrieve a list of courses a user is enrolled in
 *     tags: [User Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of user courses.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: No courses found for this user.
 *       500:
 *         description: Internal server error.
 */
router.get('/user/:userId/course', verifyToken, getUserCourses);

router.post('/users/courses/createUserCourse', verifyToken, CreateUserCourses);

/**
 * @swagger
 * /api/user/{userId}/course/{courseId}/enrollment:
 *   post:
 *     summary: Enroll a user in a course
 *     tags: [User Courses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: User enrolled in course successfully.
 *       400:
 *         description: Bad request. Invalid course ID or user ID.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.post(
  '/user/:userId/course/:courseId/enrollment',
  verifyToken,
  enrollInCourse
);

router.get('/user/:userId/course/UserCourses', verifyToken, getCoursesForUser);
router.get(
  '/user/:userId/course/SuggestedCourses',
  verifyToken,
  getSuggestedCoursesForUser
);
export default router;
