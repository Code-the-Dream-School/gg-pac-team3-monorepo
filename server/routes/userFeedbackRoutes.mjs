import express from 'express';
import {
  AddUserFeedback,
  getAllUserFeedbackByCourseId,
} from '../controllers/UserFeedbackController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

router.post('/UserFeedback/AddUserFeedback', verifyToken, AddUserFeedback);

router.get(
  '/UserFeedback/:courseId',
  verifyToken,
  getAllUserFeedbackByCourseId
);
export default router;
