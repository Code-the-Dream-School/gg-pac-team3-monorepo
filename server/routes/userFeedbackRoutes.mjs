import express from 'express';
import { AddUserFeedback } from '../controllers/UserFeedbackController.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = express.Router();

router.post('/AddUserFeedback', verifyToken, AddUserFeedback);

export default router;
