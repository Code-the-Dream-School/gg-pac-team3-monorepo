import express from 'express';
import {
  AddUserFeedback,
  getAllUserFeedbackByCourseId,
} from '../controllers/userFeedbackController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

router.post('/AddUserFeedback', verifyToken, AddUserFeedback);

router.get(
  '/:courseId',
  verifyToken,
  getAllUserFeedbackByCourseId
);
export default router;
