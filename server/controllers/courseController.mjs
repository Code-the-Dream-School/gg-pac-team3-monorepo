import dotenv from 'dotenv';
import admin from '../config/firebase.mjs';
import CourseModel from '../models/CourseModel.mjs';
import LessonModel from '../models/LessonModel.mjs';
import UserCourseModel from '../models/UserCourseModel.mjs';
import {
  COURSES,
  LESSONS,
  USER_COURSES,
  USERS,
  COURSE_ID,
  CREATED_BY,
} from './constants.mjs';
import cloudinary from '../config/cloudinary.mjs';

dotenv.config();
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

// Create a new course
export const createCourse = async (req, res) => {
  let courseData = req.body;
  const file = req.file;

  try {
    // Fetch user data
    const userRef = db.collection(USERS).doc(req.user.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send({ message: 'User not found' });
    }
    const userData = userDoc.data();

    // Check if userType is 'Teacher'
    if (userData.userType !== 'Teacher') {
      return res
        .status(403)
        .send({ message: 'Only teachers can create courses' });
    }

    courseData = await addFileToParams(file, courseData);

    // Create a new course
    const courseRef = db.collection(COURSES).doc(); 
    courseData.courseId = courseRef.id; 
    courseData.teacherId = uid; 
    courseData.createdAt = new Date(); 
    console.log('Course Data:', courseData); 

    // Add course data to Firestore
    const newCourse = new CourseModel(courseData);
    await courseRef.set(newCourse.toFirestore());

    res.status(201).json({
      message: 'Course created successfully',
      courseId: courseRef.id,
      course: newCourse
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).send({ error: error.message });
  }
};

//fetch teacherId from course table and teacher data from user table
export const getTeacherData = async (req, res) => {
  const { uid } = req.params;

  try {
    const courseDoc = await db.collection(COURSES).doc(uid).get();

    if (!courseDoc.exists) {
      return res.status(404).send({ message: 'Teacher ID not found' });
    }

    const courseData = courseDoc.data(); 
    const teacherId = courseData.teacherId; 

    const userDoc = await db.collection(USERS).doc(teacherId).get();

    if (!userDoc.exists) {
      return res.status(404).send({ message: 'User not found' });
    }


    const userData = userDoc.data(); // Get only the user data
    const { name, email, profilePictureUrl, createdAt } = userData; // Extract only the fields you need
    const createdAtDate = createdAt ? createdAt.toDate() : null;

    res
      .status(200)
      .send({ name, email, profilePictureUrl, createdAt: createdAtDate }); // Send only the selected fields

  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).send({ error: error.message });
  }
};

// Fetch a specific course by ID
export const getCourse = async (req, res) => {
  const { uid } = req.params;

  try {
    const courseDoc = await db.collection(COURSES).doc(uid).get();

    if (!courseDoc.exists) {
      return res.status(404).send({ message: 'Course not found' });
    }

    const courseData = CourseModel.fromFirestore(courseDoc.data());
    res.status(200).send(courseData);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).send({ error: error.message });
  }
};

// Fetch courses created by a specific teacher
export const getTeacherCourses = async (req, res) => {
  try {
    const { uid } = req.user; 

    if (!uid) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const coursesRef = db.collection(COURSES);
    const snapshot = await coursesRef.where('teacherId', '==', uid).get(); 

    if (snapshot.empty) {
      return res.status(200).json([]); // Return empty array if no courses
    }

    const courses = [];
    for (const doc of snapshot.docs) {
      const courseModel = CourseModel.fromFirestore(doc.data()); // Convert Firestore data to model
      const lessons = await getCourseLessons(doc.id, coursesRef); // Get lessons for this course
      const userCourses = await getUserCourses(courseModel.courseId); // Get users enrolled in this course
      courses.push({
        id: doc.id,
        lessons,
        user_courses: userCourses,
        ...courseModel,
      });
    }

    res.status(200).json(courses); 
  } catch (error) {
    console.error('Error fetching teacher courses:', error);
    res.status(500).send({ error: error.message });
  }
};

// Fetch all courses, skipping those with invalid data
export const getAllCourses = async (req, res) => {
  try {
    const coursesRef = db.collection(COURSES);
    const coursesSnapshot = await coursesRef.get();

    const courses = await Promise.all(
      coursesSnapshot.docs.map(async (doc) => {
        try {
          const data = doc.data();

          // Skip documents with missing or invalid courseType
          if (!data.courseType || typeof data.courseType !== 'string') {
            console.warn(
              `Skipping document with ID ${doc.id} due to invalid courseType.`
            );
            return null; // Skip this document
          }

          const courseModel = CourseModel.fromFirestore(data);
          const lessons = await getCourseLessons(doc.id, coursesRef);
          const userCourses = await getUserCourses(courseModel.courseId);
          return {
            id: doc.id,
            lessons: lessons,
            user_courses: userCourses,
            ...courseModel,
          };
        } catch (docError) {
          console.error(
            `Error processing document ID ${doc.id}:`,
            docError.message
          );
          return null; // Skip this document if there's an error
        }
      })
    );

    // Filter out any null values (skipped documents)
    const validCourses = courses.filter((course) => course !== null);

    res.status(200).send(validCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send({ error: error.message });
  }
};

export const getCourseLessons = async (courseId, coursesRef) => {
  try {
    const lessonsSnapshot = await coursesRef
      .doc(courseId)
      .collection(LESSONS)
      .get();

    const lessons = [];
    lessonsSnapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...LessonModel.fromFirestore(doc.data()) });
    });

    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
};

export const getUserCourses = async (courseId) => {
  try {
    const userCoursesSnapshot = await db
      .collection(USER_COURSES)
      .where(COURSE_ID, '==', courseId)
      .get();

    if (userCoursesSnapshot.empty) {
      return [];
    }

    const users = [];
    userCoursesSnapshot.docs.forEach((doc) => {
      users.push({ id: doc.id, ...UserCourseModel.fromFirestore(doc.data()) });
    });

    return users;
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return [];
  }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
  const { uid } = req.params;
  let updates = req.body;
  const file = req.file;

  try {
    // Access the courses subcollection within the user document
    const courseRef = db.collection(COURSES).doc(uid);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      return res.status(404).send({ message: 'Course not found' });
    }
    updates = await addFileToParams(file, updates);
    await courseRef.update(updates);
    res.status(200).send({ message: 'Course updated successfully' });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).send({ error: error.message });
  }
};


export const updateCourseRating = async (req, res) => {
  const { courseId } = req.params; 
  const { rating } = req.body;   
  try {
    // Reference to the course document in the courses collection
    const courseRef = db.collection(COURSES).doc(courseId);
    const courseDoc = await courseRef.get();

    // Check if the course document exists
    if (!courseDoc.exists) {
      return res.status(404).send({ message: 'Course not found' });
    }

    // If "rating" field doesn't exist, create it
    if (!Object.prototype.hasOwnProperty.call(courseDoc.data(), 'rating')) {
      // Set the initial rating field
      await courseRef.set({ rating: rating }, { merge: true }); // Merge ensures other fields remain unchanged
    } else {
      // If the rating field exists, update it
      await courseRef.update({ rating: rating });
    }

    res.status(200).send({ message: 'Course rating updated successfully' });
  } catch (error) {
    console.error('Error updating course rating:', error);
    res.status(500).send({ error: error.message });
  }
};

const addFileToParams = async (file, params) => {
  if (file) {
    const uploadResult = await cloudinary.uploader
      .upload(file.path)
      .catch((error) => {
        console.log(error);
      });

    params.imageUrl = uploadResult.secure_url;
    params.logoUrl = uploadResult.secure_url;

    return params;
  }
  return params;
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
  const { uid } = req.params;

  try {
    // Access the courses subcollection within the user document
    const courseRef = db.collection(COURSES).doc(uid);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      return res.status(404).send({ message: 'Course not found' });
    }

    await courseRef.delete();
    res.status(200).send({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send({ error: error.message });
  }
};

