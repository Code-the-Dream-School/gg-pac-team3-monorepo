import admin from 'firebase-admin';

class UserCourseModel {
  constructor({
    userId,
    courseId,
    enrolledAt = new Date(), // Default to current date if not provided
    progress = 0, // Default to 0 if not provided
    completed = false, // Default to false if not provided
    earnedPoints = 0 // Default to 0 if not provided
  }) {
    // Validate types
    if (typeof userId !== 'string') throw new Error('Invalid userId');
    if (typeof courseId !== 'string') throw new Error('Invalid courseId');
    if (!(enrolledAt instanceof Date)) throw new Error('Invalid enrolledAt');
    if (typeof progress !== 'number') throw new Error('Invalid progress');
    if (typeof completed !== 'boolean') throw new Error('Invalid completed');
    if (typeof earnedPoints !== 'number') throw new Error('Invalid earnedPoints');

    this.userId = userId;
    this.courseId = courseId;
    this.enrolledAt = enrolledAt;
    this.progress = progress;
    this.completed = completed;
    this.earnedPoints = earnedPoints;
  }

  // Convert to Firestore format
  toFirestore() {
    return {
      userId: this.userId,
      courseId: this.courseId,
      enrolledAt: admin.firestore.Timestamp.fromDate(this.enrolledAt), // Convert JavaScript Date to Firestore Timestamp
      progress: this.progress,
      completed: this.completed,
      earnedPoints: this.earnedPoints
    };
  }

  // Convert from Firestore format
  static fromFirestore(data) {
    return new UserCourseModel({
      userId: data.userId,
      courseId: data.courseId,
      enrolledAt: data.enrolledAt.toDate(), // Convert Firestore Timestamp to JavaScript Date object
      progress: data.progress,
      completed: data.completed,
      earnedPoints: data.earnedPoints
    });
  }
}

export default UserCourseModel;
