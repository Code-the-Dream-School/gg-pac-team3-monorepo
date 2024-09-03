import admin from '../../server/config/firebase.mjs';
import { enrollInCourse, getUserCourses } from '../../server/controllers/userCourseController.mjs';
import supertest from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

// Middleware to simulate authenticated user
const simulateAuth = (req, res, next) => {
  req.user = { uid: 'testUserId' }; 
  next();
};

// Route setup for user course endpoints
app.post('/user/enroll', simulateAuth, enrollInCourse);
app.get('/user/:userId/courses', simulateAuth, getUserCourses);

let testUserId = 'testUserId';
let testCourseId = 'testCourseId';
let server;

beforeAll(async () => {
  server = app.listen(4050);

  // Setup test data: Enroll a test user in a test course
  await admin.firestore().collection('User_Courses').add({
    userId: testUserId,
    courseId: testCourseId,
    enrolledAt: new Date(),
  });
});

afterAll(async () => {
  // Cleanup test data: Remove the test user-course enrollment
  try {
    const userCoursesSnapshot = await admin.firestore().collection('User_Courses')
      .where('userId', '==', testUserId)
      .get();

    const batch = admin.firestore().batch();
    userCoursesSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error during cleanup:', error);
  } finally {
    // Ensure the server is closed before terminating Firestore client
    if (server) {
      server.close();
    }

    // Ensure Firestore is only terminated after all operations are complete
    await admin.firestore().terminate();
  }
});

describe('UserCourse Controller', () => {
  test('should enroll a user in a course successfully', async () => {
    // This test verifies that a user can be enrolled in a new course
    const response = await supertest(app)
      .post('/user/enroll')
      .send({ courseId: 'newCourseId' })
      .expect(201);

    expect(response.body.message).toBe('Enrolled in course successfully');
    expect(response.body.id).toBeDefined();
  });

  test('should fetch courses for a specific user successfully', async () => {
    // This test checks that courses for a specific user can be retrieved
    const response = await supertest(app)
      .get(`/user/${testUserId}/courses`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].courseId).toBe(testCourseId);
  });

  test('should return 404 if user has no courses', async () => {
    // This test verifies that a 404 error is returned if the user has no courses
    const response = await supertest(app)
      .get(`/user/unknownUserId/courses`)
      .expect(404);  // Expect 404 Not Found

    expect(response.body.message).toBe('No courses found for this user');  // Verify the message if applicable
});
});
