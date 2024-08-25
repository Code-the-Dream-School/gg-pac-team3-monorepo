import admin from '../server/config/firebase.mjs';
import {
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse
} from '../server/controllers/courseController.mjs';
import { USERS, COURSES } from '../server/controllers/constants.mjs';
import supertest from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

// Route setup for course endpoints
app.post('/course', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, createCourse);

app.get('/course/:uid', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, getCourse);

app.patch('/course/:uid', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, updateCourse);

app.delete('/course/:uid', (req, res, next) => {
  req.user = { uid: 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2' }; // Simulating authenticated user
  next();
}, deleteCourse);

let testCourseId;
let testUserId = 'GttuQ8W2RaQbHoDtIX0GYG1IBeZ2'; // Example test user ID
let server;

// Setup before tests
beforeAll(async () => {
  server = app.listen(4000);
  // Set up a test user in Firestore (a user with 'Teacher' role)
  const userRef = admin.firestore().collection(USERS).doc(testUserId);
  await userRef.set({
    email: 'test.teacher@example.com',
    userType: 'Teacher',
    uid: testUserId,
  });
});

// Cleanup after tests
afterAll(async () => {
  // Clean up Firestore: delete the test course and test user
  if (testCourseId) {
    await admin.firestore().collection(COURSES).doc(testCourseId).delete();
  }
  await admin.firestore().collection(USERS).doc(testUserId).delete();
  server.close();
  await admin.firestore().terminate();
});

describe('Course Controller', () => {

  // Test for creating a course
  test('should create a new course successfully for a teacher', async () => {
    const courseData = {
      courseName: 'Test Course',
      courseType: 'Programming',
      description: 'A course for testing',
      imageUrl: 'http://example.com/image.png',
      logoUrl: 'http://example.com/logo.png',
      duration: '2 months',
      rating: 4.5,
      otherInfo: 'Some additional info',
      createdBy: 'admin@example.com',
    };

    const response = await supertest(app)
      .post('/course')
      .send(courseData)
      .expect(201);

    expect(response.body.message).toBe('Course created successfully');
    expect(response.body.courseId).toBeDefined();

    testCourseId = response.body.courseId; // Store the courseId for subsequent tests
  });

  // Test for fetching a specific course
  test('should fetch a specific course successfully', async () => {
    const response = await supertest(app)
      .get(`/course/${testCourseId}`)
      .expect(200);

    expect(response.body.courseName).toBe('Test Course');
  });

  // Test for updating a course
  test('should update a course successfully', async () => {
    const updates = { courseName: 'Updated Test Course' };

    const response = await supertest(app)
      .patch(`/course/${testCourseId}`)
      .send(updates)
      .expect(200);

    expect(response.body.message).toBe('Course updated successfully');

    // Verify the update
    const fetchResponse = await supertest(app)
      .get(`/course/${testCourseId}`)
      .expect(200);

    expect(fetchResponse.body.courseName).toBe('Updated Test Course');
  });

  // Test for deleting a course
  test('should delete a course successfully', async () => {
    const response = await supertest(app)
      .delete(`/course/${testCourseId}`)
      .expect(200);

    expect(response.body.message).toBe('Course deleted successfully');

    // Verify the deletion
    await supertest(app)
      .get(`/course/${testCourseId}`)
      .expect(404);
  });
});
