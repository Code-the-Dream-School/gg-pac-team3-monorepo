import express from 'express';
import {
  AddUserFeedback,
  //   getUser,
  //   signupUser,
  //   getUserDashboard,
  //   loginUser,
  //   logoffUser,
  //   getAllUsers,

  //   updateUserProfile,
} from '../controllers/UserFeedbackController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

// router.get('/', verifyToken, getAllUsers);

// router.get('/:uid', verifyToken, getUser);

router.post('/AddUserFeedback', verifyToken, AddUserFeedback);

// router.post('/login', loginUser);

// router.post('/logoff/:uid', verifyToken, logoffUser);

// router.get('/:uid/dashboard', verifyToken, getUserDashboard);

// router.patch('/:uid', verifyToken, updateUserProfile);

export default router;
