const admin = require('firebase-admin');

class CourseModel {
  constructor({
    coursesCode,
    courseName,
    typeOfCourse,
    description,
    courseImgUrl,
    logoUrl,
    points,
    rating,
    otherInfo,
    videoURL = [], // Default to empty array if not provided
    lessonInfo = {}, // Default to empty object if not provided
    courseTutorialImgURL = [], // Default to empty array if not provided
    quizCode = [], // Default to empty array if not provided
    feedback,
    createdBy,
    createdAt = new Date() // Default to current date if not provided
  }) {
    // Validate types
    if (typeof coursesCode !== 'string') throw new Error('Invalid coursesCode');
    if (typeof courseName !== 'string') throw new Error('Invalid courseName');
    if (typeof typeOfCourse !== 'string') throw new Error('Invalid typeOfCourse');
    if (typeof description !== 'string') throw new Error('Invalid description');
    if (typeof courseImgUrl !== 'string') throw new Error('Invalid courseImgUrl');
    if (typeof logoUrl !== 'string') throw new Error('Invalid logoUrl');
    if (typeof points !== 'number') throw new Error('Invalid points');
    if (typeof rating !== 'number') throw new Error('Invalid rating');
    if (typeof otherInfo !== 'string') throw new Error('Invalid otherInfo');
    if (!Array.isArray(videoURL)) throw new Error('Invalid videoURL');
    if (typeof lessonInfo !== 'object') throw new Error('Invalid lessonInfo');
    if (!Array.isArray(courseTutorialImgURL)) throw new Error('Invalid courseTutorialImgURL');
    if (!Array.isArray(quizCode)) throw new Error('Invalid quizCode');
    if (typeof feedback !== 'string') throw new Error('Invalid feedback');
    if (typeof createdBy !== 'string') throw new Error('Invalid createdBy');
    if (!(createdAt instanceof Date)) throw new Error('Invalid createdAt');

    this.coursesCode = coursesCode;
    this.courseName = courseName;
    this.typeOfCourse = typeOfCourse;
    this.description = description;
    this.courseImgUrl = courseImgUrl;
    this.logoUrl = logoUrl;
    this.points = points;
    this.rating = rating;
    this.otherInfo = otherInfo;
    this.videoURL = videoURL;
    this.lessonInfo = lessonInfo;
    this.courseTutorialImgURL = courseTutorialImgURL;
    this.quizCode = quizCode;
    this.feedback = feedback;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }

  // Convert to Firestore format
  toFirestore() {
    return {
      coursesCode: this.coursesCode,
      courseName: this.courseName,
      typeOfCourse: this.typeOfCourse,
      description: this.description,
      courseImgUrl: this.courseImgUrl,
      logoUrl: this.logoUrl,
      points: this.points,
      rating: this.rating,
      otherInfo: this.otherInfo,
      videoURL: this.videoURL,
      lessonInfo: this.lessonInfo,
      courseTutorialImgURL: this.courseTutorialImgURL,
      quizCode: this.quizCode,
      feedback: this.feedback,
      createdBy: this.createdBy,
      createdAt: admin.firestore.Timestamp.fromDate(this.createdAt) // Convert JavaScript Date to Firestore Timestamp
    };
  }

  // Convert from Firestore format
  static fromFirestore(data) {
    return new CourseModel({
      coursesCode: data.coursesCode,
      courseName: data.courseName,
      typeOfCourse: data.typeOfCourse,
      description: data.description,
      courseImgUrl: data.courseImgUrl,
      logoUrl: data.logoUrl,
      points: data.points,
      rating: data.rating,
      otherInfo: data.otherInfo,
      videoURL: data.videoURL || [], // Ensure default to empty array if not present
      lessonInfo: data.lessonInfo || {}, // Ensure default to empty object if not present
      courseTutorialImgURL: data.courseTutorialImgURL || [], // Ensure default to empty array if not present
      quizCode: data.quizCode || [], // Ensure default to empty array if not present
      feedback: data.feedback,
      createdBy: data.createdBy,
      createdAt: data.createdAt.toDate() // Convert Firestore Timestamp to JavaScript Date object
    });
  }
}

module.exports = CourseModel;
