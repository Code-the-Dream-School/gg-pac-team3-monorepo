import admin from '../config/firebase.mjs';
import LessonModel from '../models/LessonModel.mjs';
import { COURSES, LESSONS } from './constants.mjs';
import cloudinary from "../config/cloudinary.mjs";

const db = admin.firestore();

// Create a new lesson in a course
export const createLesson = async (req, res) => {
  const { courseId } = req.params; // courseId from URL params
  let lessonData = req.body;
  const { file, image } = req.files;
  if (lessonData.description) {
    lessonData['description'] = JSON.parse(lessonData['description']);
  }
  //console.log({lessonData})

  if (file) {
    lessonData = await addFileToParams(file[0], lessonData);
  }

  if (image) {
    lessonData = await addFileToParams(image[0], lessonData);
  }
  lessonData = setLessonId(lessonData);
  lessonData['points'] = parseInt(lessonData['points']);
  if (lessonData['videoLinks']) {
    lessonData['videoLinks'] = JSON.parse(lessonData['videoLinks']);
  }

  //console.log({lessonData});

  try {
    const courseRef = db.collection(COURSES).doc(courseId);
    const courseDoc = await courseRef.get();

    if (!courseDoc.exists) {
      return res.status(404).send({ message: 'Course not found' });
    }

    const newLesson = new LessonModel(lessonData);
    const lessonRef = courseRef.collection(LESSONS).doc(); // Generate a new document ID
    await lessonRef.set(newLesson.toFirestore());

    res
      .status(201)
      .send({ message: 'Lesson created successfully', lessonId: lessonRef.id });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).send({ error: error.message });
  }
};

const addFileToParams = async (file, params) => {
  params.description = params.description || {};
  if (file) {
    const uploadResult = await cloudinary.uploader.upload(file.path).catch((error) => {
      console.log(error);
    });
    params.description[file.fieldname] = uploadResult.secure_url;
  }
  return params;
}

const setLessonId = (params) => {
  if (!params.lessonId && params.title) {
    params.lessonId = camelCase(params.title);
  }
  return params;
}

// Fetch a specific lesson by ID
export const getLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;

  try {
    const lessonDoc = await db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId)
      .get();

    if (!lessonDoc.exists) {
      return res.status(404).send({ message: 'Lesson not found' });
    }

    const lessonData = LessonModel.fromFirestore(lessonDoc.data());
    res.status(200).send(lessonData);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).send({ error: error.message });
  }
};

// Fetch all lessons in a course
export const getAllLessons = async (req, res) => {

  const { courseId } = req.params;

  try {
    const lessonsSnapshot = await db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .get();

    const lessons = [];
    lessonsSnapshot.forEach((doc) => {
      lessons.push({ id: doc.id, ...LessonModel.fromFirestore(doc.data()) });
    });
    res.status(200).send(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).send({ error: error.message });
  }

};

// Update a lesson by ID
export const updateLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;
  const updates = req.body;

  try {
    const lessonRef = db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId);
    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      return res.status(404).send({ message: 'Lesson not found' });
    }

    await lessonRef.update(updates);
    res.status(200).send({ message: 'Lesson updated successfully' });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).send({ error: error.message });
  }
};

// Delete a lesson by ID
export const deleteLesson = async (req, res) => {
  const { courseId, lessonId } = req.params;

  try {
    const lessonRef = db
      .collection(COURSES)
      .doc(courseId)
      .collection(LESSONS)
      .doc(lessonId);
    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      return res.status(404).send({ message: 'Lesson not found' });
    }

    await lessonRef.delete();
    res.status(200).send({ message: 'Lesson deleted successfully' });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).send({ error: error.message });
  }
};

function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
