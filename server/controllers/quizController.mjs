import admin from '../config/firebase.mjs';
import QuizModel from '../models/QuizModel.mjs';
import { COURSES, LESSONS, QUIZZES } from './constants.mjs';

const db = admin.firestore();

// Create a new quiz for a lesson
export const createQuiz = async (req, res) => {
  const { lessonId, courseId } = req.params;
  const quizData = req.body;

  try {
    const lessonRef = db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId);
    const quizRef = lessonRef.collection(QUIZZES).doc(); // Generate a new document ID
    const quizId = quizRef.id; // Get the generated ID

    const newQuiz = new QuizModel({
      ...quizData,
      questions: quizData.questions || [],
      createdAt: new Date(),
      quizId, // Set the generated ID here
    });

    await quizRef.set(newQuiz.toFirestore());

    res.status(201).send({ message: 'Quiz created successfully', quizId });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).send({ error: 'Failed to create quiz' });
  }
};

// Get a quiz by ID
export const getQuiz = async (req, res) => {
  const { lessonId, courseId, quizId } = req.params;

  try {
    const quizDoc = await db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId)
      .collection(QUIZZES)
      .doc(quizId)
      .get();

    if (!quizDoc.exists) {
      return res.status(404).send({ message: 'Quiz not found' });
    }

    const quizData = QuizModel.fromFirestore(quizDoc.data());
    res.status(200).send(quizData);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).send({ error: 'Failed to fetch quiz' });
  }
};

// Get all quizzes for a lesson
export const getAllQuizzesForLesson = async (req, res) => {
  const { lessonId, courseId } = req.params;

  try {
    // Check if the course exists
    const courseDoc = await db.collection(COURSES).doc(courseId).get();
    if (!courseDoc.exists) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // Check if the lesson exists
    const lessonDoc = await db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId)
      .get();
    if (!lessonDoc.exists) {
      return res.status(404).send({ message: 'Lesson not found' });
    }

    // Fetch quizzes for the lesson
    const quizzesSnapshot = await db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId)
      .collection(QUIZZES)
      .get();

    if (quizzesSnapshot.empty) {
      // Return an empty array if no quizzes are found
      return res.status(200).send([]);
    }

    const quizzes = [];
    quizzesSnapshot.forEach((doc) => {
      quizzes.push({ id: doc.id, ...QuizModel.fromFirestore(doc.data()) });
    });

    res.status(200).send(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).send({ error: 'Failed to fetch quizzes' });
  }
};

// Update a quiz by ID
export const updateQuiz = async (req, res) => {
  const { lessonId, courseId, quizId } = req.params;
  const updates = req.body;

  try {
    const quizRef = db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId)
      .collection(QUIZZES)
      .doc(quizId);
    const quizDoc = await quizRef.get();
    const oldQuizData = quizDoc.data()

    if (!quizDoc.exists) {
      return res.status(404).send({ message: 'Quiz not found' });
    }

    console.log({updates})

    await quizRef.update({
      ...updates
    });
    res.status(200).send({ message: 'Quiz updated successfully' });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).send({ error: 'Failed to update quiz' });
  }
};

// Delete a quiz by ID
export const deleteQuiz = async (req, res) => {
  const { lessonId, courseId, quizId } = req.params;

  try {
    const quizRef = db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId)
      .collection(QUIZZES)
      .doc(quizId);
    const quizDoc = await quizRef.get();

    if (!quizDoc.exists) {
      return res.status(404).send({ message: 'Quiz not found' });
    }

    await quizRef.delete();
    res.status(200).send({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).send({ error: 'Failed to delete quiz' });
  }
};
