import dotenv from 'dotenv';
import admin from '../config/firebase.mjs';
import UserFeedbackModel from '../models/UserFeedbackModel.mjs';
import { USER_FEEDBACKS } from './constants.mjs';

dotenv.config();
const db = admin.firestore();

//function to add user feedback
export const AddUserFeedback = async (req, res) => {
  let userFeedbackData = req.body;
  try {
    const newUserFeedback = new UserFeedbackModel(userFeedbackData);
    const feedbackRef = db.collection(USER_FEEDBACKS).doc();
    await feedbackRef.set(newUserFeedback.toFirestore());

    res.status(201).send({ message: 'User feedback saved successfully' });
  } catch (error) {
    console.error('Error saving user feedback:', error);
    res.status(500).send({ error: error.message });
  }
};
