import express from 'express';
import { getUser, signupUser, getUserDashboard, loginUser, logoffUser, getAllUsers, resetPassword, updateUserProfile } from '../controllers/userController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

// Route to get all users records
router.get('/', verifyToken, getAllUsers);

// Route to get user record by UID
router.get('/:uid', verifyToken, getUser);

// Route for user dashboard
router.get('/:uid/dashboard', verifyToken, getUserDashboard);

// Route for user signup (Creating a new user)
router.post('/', signupUser);

// Route for user login
router.post('/login', loginUser);

// Route for user logoff
router.post('/logoff/:uid', verifyToken, logoffUser);

// Route for resetting password
router.post('/resetpassword', resetPassword);

// Route for updating user profile
router.patch('/:uid', verifyToken, updateUserProfile);

export default router;
