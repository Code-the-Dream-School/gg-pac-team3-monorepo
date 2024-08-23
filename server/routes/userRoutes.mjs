import express from 'express';
import { getUser, signupUser, getUserDashboard, loginUser, logoffUser, getAllUsers, resetPassword, updateUserProfile } from '../controllers/userController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API to manage users.
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get('/', verifyToken, getAllUsers);

/**
 * @swagger
 * /api/user/{uid}:
 *   get:
 *     summary: Retrieve a single user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:uid', verifyToken, getUser);

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request. Invalid user data.
 *       500:
 *         description: Internal server error.
 */
router.post('/', signupUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       400:
 *         description: Bad request. Invalid email or password.
 *       401:
 *         description: Unauthorized. Incorrect credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/user/logoff/{uid}:
 *   post:
 *     summary: Log off a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the user to log off
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User logged off successfully.
 *       400:
 *         description: Bad request. Invalid user ID.
 *       500:
 *         description: Internal server error.
 */
router.post('/logoff/:uid', verifyToken, logoffUser);

/**
 * @swagger
 * /api/user/resetpassword:
 *   post:
 *     summary: Reset a user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent.
 *       400:
 *         description: Bad request. Invalid email.
 *       500:
 *         description: Internal server error.
 */
router.post('/resetpassword', resetPassword);

/**
 * @swagger
 * /api/user/{uid}/dashboard:
 *   get:
 *     summary: Retrieve the user dashboard
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User dashboard retrieved successfully.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:uid/dashboard', verifyToken, getUserDashboard);

/**
 * @swagger
 * /api/user/{uid}:
 *   patch:
 *     summary: Update a user's profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               profilePictureUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       400:
 *         description: Bad request. Invalid data provided.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:uid', verifyToken, updateUserProfile);

export default router;
