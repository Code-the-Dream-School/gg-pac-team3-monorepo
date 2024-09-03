import admin from 'firebase-admin';

class CourseModel {
  constructor({
    courseId = null, // Default to null; this will be set after Firestore document creation
    courseName,
    courseType,
    description,
    imageUrl,
    logoUrl,
    duration,
    rating,
    otherInfo,
    createdBy,
    createdAt = new Date(), // Default to current date if not provided
  }) {
    // Validate types
    if (typeof courseId !== 'string') throw new Error('Invalid courseId');
    if (typeof courseName !== 'string') throw new Error('Invalid courseName');
    if (typeof description !== 'string') throw new Error('Invalid description');
    if (typeof imageUrl !== 'string') throw new Error('Invalid imageUrl');
    if (typeof createdBy !== 'string') throw new Error('Invalid createdBy');
    if (!(createdAt instanceof Date)) throw new Error('Invalid createdAt');

    // Optional fields
    if (courseType && typeof courseType !== 'string') throw new Error('Invalid courseType');
    if (logoUrl && typeof logoUrl !== 'string') throw new Error('Invalid logoUrl');
    if (duration && typeof duration !== 'string') throw new Error('Invalid duration');
    if (rating && typeof rating !== 'number') throw new Error('Invalid rating');
    if (otherInfo && typeof otherInfo !== 'string') throw new Error('Invalid otherInfo');

    this.courseId = courseId;
    this.courseName = courseName;
    this.courseType = courseType;
    this.description = description;
    this.imageUrl = imageUrl;
    this.logoUrl = logoUrl;
    this.duration = duration;
    this.rating = rating;
    this.otherInfo = otherInfo;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }

  // Convert to Firestore format
  toFirestore() {
    const data = {
      courseName: this.courseName,
      courseType: this.courseType,
      description: this.description,
      imageUrl: this.imageUrl,
      logoUrl: this.logoUrl,
      duration: this.duration,
      rating: this.rating,
      otherInfo: this.otherInfo,
      createdBy: this.createdBy,
      createdAt: admin.firestore.Timestamp.fromDate(this.createdAt), // Convert JavaScript Date to Firestore Timestamp
    };

    if (this.courseId) {
      data.courseId = this.courseId; // Include courseId if it's set
    }

    return data;
  }

  // Convert from Firestore format
  static fromFirestore(data, id) {
    return new CourseModel({
      courseId: id, // Use the Firestore document ID as the courseId
      courseName: data.courseName,
      courseType: data.courseType,
      description: data.description,
      imageUrl: data.imageUrl,
      logoUrl: data.logoUrl,
      duration: data.duration,
      rating: data.rating,
      otherInfo: data.otherInfo,
      createdBy: data.createdBy,
      createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date object
    });
  }
}

export default CourseModel;
