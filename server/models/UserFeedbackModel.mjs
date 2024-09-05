import admin from '../config/firebase.mjs';

class UserFeedbackModel {
  constructor({
    courseId,
    userId,
    rating,
    feedback = null, // Default image URL
    createdAt = new Date(),
  }) {
    this.courseId = courseId;
    this.userId = userId;
    this.rating = rating;
    this.feedback = feedback;
    this.createdAt = createdAt;
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new UserFeedbackModel({
      courseId: data.courseId,
      userId: data.userId,
      rating: data.rating,
      feedback: data.feedback,
      createdAt: data.createdAt.toDate(),
    });
  }

  toFirestore() {
    return {
      courseId: this.courseId,
      userId: this.userId,
      rating: this.rating,
      feedback: this.feedback,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
  }
}

export default UserFeedbackModel;
