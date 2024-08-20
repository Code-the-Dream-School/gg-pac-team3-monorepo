import admin from '../config/firebase.mjs';
import UserCourseModel from '../models/userCourseModel.mjs';
import { USER_COURSES, COURSES  } from './constants.mjs';
import CourseModel from '../models/CourseModel.mjs';
const db = admin.firestore();

export const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.params;
    // const { courseId } = req.body;

  try {
    const userCourse = new UserCourseModel({
      userId,
      courseId,
      enrolledAt: new Date()
    });

    const userCourseRef = db.collection(USER_COURSES).doc();
    await userCourseRef.set(userCourse.toFirestore());

    res.status(201).send({ message: 'Enrolled in course successfully', id: userCourseRef.id });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).send({ error: error.message });
  }
};
// getNotenrollInCourse

export const getNotEnrolledInCourseByUser = async (req, res) => {
  const { userId } = req.params;

  try {
      // Step 1: Fetch all courses
      const allCoursesSnapshot = await db.collection(COURSES).get();
      const allCourses = [];
      allCoursesSnapshot.forEach(doc => {
          allCourses.push({ id: doc.id, ...CourseModel.fromFirestore(doc.data()) });
      });

      // Step 2: Fetch user's enrolled courses
      const userCoursesSnapshot = await db.collection(USER_COURSES)
          .where('userId', '==', userId)
          .get();

      const enrolledCourses = new Set();
      userCoursesSnapshot.forEach(doc => {
          enrolledCourses.add(doc.data().courseId);
      });

      // Step 3: Filter out courses that the user is enrolled in
      const notEnrolledCourses = allCourses.filter(course => !enrolledCourses.has(course.id));

      res.status(200).send(notEnrolledCourses);
  } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send({ error: error.message });
  }
};

export const getUserCourses = async (req, res) => {
  const { userId } = req.params;

  try {
    const userCoursesSnapshot = await db.collection(USER_COURSES)
      .where('userId', '==', userId)
      .get();

    if (userCoursesSnapshot.empty) {
      return res.status(404).send({ message: 'No courses found for this user' });
    }

    const courses = [];
    userCoursesSnapshot.forEach(doc => {
      courses.push({ id: doc.id, ...UserCourseModel.fromFirestore(doc.data()) });
    });

    res.status(200).send(courses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).send({ error: error.message });
  }
};

export const getUserCoursesWithDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    // Step 1: Fetch course IDs from user_course collection
    const userCoursesSnapshot = await db.collection(USER_COURSES)
      .where('userId', '==', userId)
      .get();

    if (userCoursesSnapshot.empty) {
      return res.status(404).send({ message: 'No courses found for this user' });
    }

    const courseIds = userCoursesSnapshot.docs.map(doc => doc.data().courseId);

    if (courseIds.length === 0) {
      return res.status(404).send({ message: 'No courses found for this user' });
    }

    // Step 2: Fetch course details from course collection
    const coursesSnapshot = await db.collection(COURSES)
      .where(admin.firestore.FieldPath.documentId(), 'in', courseIds)
      .get();

    if (coursesSnapshot.empty) {
      return res.status(404).send({ message: 'No course details found' });
    }

    const courses = [];
    coursesSnapshot.forEach(doc => {
      courses.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).send(courses);
  } catch (error) {
    console.error('Error fetching user courses with details:', error);
    res.status(500).send({ error: error.message });
  }
};
