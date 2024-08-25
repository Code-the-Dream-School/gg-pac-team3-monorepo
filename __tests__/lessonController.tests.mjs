import admin from '../server/config/firebase.mjs';
import {
  createLesson,
  getLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
} from '../server/controllers/lessonController.mjs';
import { COURSES, LESSONS } from '../server/controllers/constants.mjs';
import supertest from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

// Route setup for lesson endpoints
app.post('/course/:courseId/lesson', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, createLesson);

app.get('/course/:courseId/lesson/:lessonId', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, getLesson);

app.get('/course/:courseId/lessons', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, getAllLessons);

app.patch('/course/:courseId/lesson/:lessonId', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, updateLesson);

app.delete('/course/:courseId/lesson/:lessonId', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, deleteLesson);

let testCourseId;
let testLessonId;
let server;

// Setup before tests
beforeAll(async () => {
  server = app.listen(4001);
  // Set up a test course in Firestore
  const courseRef = admin.firestore().collection(COURSES).doc();
  await courseRef.set({
    courseName: 'Test Course for Lessons',
    courseType: 'Test',
    description: 'A course for testing lessons',
    createdBy: 'test@example.com',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  testCourseId = courseRef.id;
});

// Cleanup after tests
afterAll(async () => {
  // Clean up Firestore: delete the test course and lessons
  if (testLessonId) {
    await admin.firestore()
      .collection(COURSES)
      .doc(testCourseId)
      .collection(LESSONS)
      .doc(testLessonId)
      .delete();
  }
  await admin.firestore().collection(COURSES).doc(testCourseId).delete();
  server.close();
  await admin.firestore().terminate();
});

describe('Lesson Controller', () => {

  // Test for creating a lesson
  test('should create a new lesson successfully', async () => {
    const lessonData = {
      title: 'Test Lesson',
      description: { content: 'This is a test lesson' },
      points: 10,
      order: 1,
      videoLinks: ['http://example.com/video'],
      materials: 'Test materials',
    };

    const response = await supertest(app)
      .post(`/course/${testCourseId}/lesson`)
      .send(lessonData)
      .expect(201);

    expect(response.body.message).toBe('Lesson created successfully');
    expect(response.body.lessonId).toBeDefined();

    testLessonId = response.body.lessonId; // Store the lessonId for subsequent tests
  });

  // Test for fetching a specific lesson
  test('should fetch a specific lesson successfully', async () => {
    const response = await supertest(app)
      .get(`/course/${testCourseId}/lesson/${testLessonId}`)
      .expect(200);

    expect(response.body.title).toBe('Test Lesson');
  });

  // Test for fetching all lessons in a course
  test('should fetch all lessons in a course successfully', async () => {
    const response = await supertest(app)
      .get(`/course/${testCourseId}/lessons`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].title).toBe('Test Lesson');
  });

  // Test for updating a lesson
  test('should update a lesson successfully', async () => {
    const updates = { title: 'Updated Test Lesson' };

    const response = await supertest(app)
      .patch(`/course/${testCourseId}/lesson/${testLessonId}`)
      .send(updates)
      .expect(200);

    expect(response.body.message).toBe('Lesson updated successfully');

    // Verify the update
    const fetchResponse = await supertest(app)
      .get(`/course/${testCourseId}/lesson/${testLessonId}`)
      .expect(200);

    expect(fetchResponse.body.title).toBe('Updated Test Lesson');
  });

  // Test for deleting a lesson
  test('should delete a lesson successfully', async () => {
    const response = await supertest(app)
      .delete(`/course/${testCourseId}/lesson/${testLessonId}`)
      .expect(200);

    expect(response.body.message).toBe('Lesson deleted successfully');

    // Verify the deletion
    await supertest(app)
      .get(`/course/${testCourseId}/lesson/${testLessonId}`)
      .expect(404);
  });
});
