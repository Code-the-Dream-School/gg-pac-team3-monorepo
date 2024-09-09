import dotenv from 'dotenv';
import admin from '../config/firebase.mjs';
import UserFeedbackModel from '../models/UserFeedbackModel.mjs';
import { USER_FEEDBACKS, COURSE_ID } from './constants.mjs';

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

// function to get user feedback
export const getAllUserFeedbackByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userFeedbackSnapshot = await db
      .collection(USER_FEEDBACKS)
      .where(COURSE_ID, '==', courseId)
      .get();

    if (userFeedbackSnapshot.empty) {
      return [];
    }

    const userFeedbackData = [];
    userFeedbackSnapshot.forEach((doc) => {
      userFeedbackData.push({
        feedbackId: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).send(userFeedbackData);
  } catch (error) {
    console.error('Error fetching user feedback:', error);
  }
};
