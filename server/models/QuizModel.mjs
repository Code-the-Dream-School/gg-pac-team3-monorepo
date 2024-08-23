import admin from '../config/firebase.mjs';

class QuizModel {
  constructor({
    quizId,
    title,
    questions = [], // Array of questions
    createdAt = new Date() // Default to current date if not provided
  }) {
    // Validate types
    if (typeof quizId !== 'string') throw new Error('Invalid quizId');
    if (typeof title !== 'string') throw new Error('Invalid title');
    if (!Array.isArray(questions)) throw new Error('Invalid questions');
    if (!(createdAt instanceof Date)) throw new Error('Invalid createdAt');

    this.quizId = quizId;
    this.title = title;
    this.questions = questions;
    this.createdAt = createdAt;
  }

  // Convert to Firestore format
  toFirestore() {
    return {
      quizId: this.quizId,
      title: this.title,
      questions: this.questions,
      createdAt: admin.firestore.Timestamp.fromDate(this.createdAt) // Convert JavaScript Date to Firestore Timestamp
    };
  }

  // Convert from Firestore format
  static fromFirestore(data) {
    return new QuizModel({
      quizId: data.quizId,
      title: data.title,
      questions: data.questions || [], // Ensure default to empty array if not present
      createdAt: data.createdAt.toDate() // Convert Firestore Timestamp to JavaScript Date object
    });
  }
}

export default QuizModel;
