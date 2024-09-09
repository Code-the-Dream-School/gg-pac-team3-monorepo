import admin from '../../server/config/firebase.mjs';
import {
  enrollInCourse,
  getUserCourses,
  getSuggestedCoursesForUser,
  getCoursesForUser
} from '../../server/controllers/userCourseController.mjs';
import { USER_COURSES, COURSES } from '../../server/controllers/constants.mjs';
import supertest from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

let testUserId = 'testUserId';
let testCourseId;
let testUserCourseId;
let server;

// Mock Authentication middleware
const simulateAuth = (req, res, next) => {
  req.user = { uid: testUserId };
  next();
};

// Set up routes for the user course endpoints
app.post('/user/:userId/course/:courseId/enroll', simulateAuth, enrollInCourse);
app.get('/user/:userId/courses', simulateAuth, getUserCourses);
app.get('/user/:userId/suggested-courses', simulateAuth, getSuggestedCoursesForUser);
app.get('/user/:userId/course-details', simulateAuth, getCoursesForUser);

// Setup before tests
beforeAll(async () => {
  server = app.listen(4050);

  // Mock course data
  const courseRef = admin.firestore().collection(COURSES).doc();
  testCourseId = courseRef.id;
  await courseRef.set({
    courseName: 'Test Course',
    courseType: 'Programming',
    description: 'A course for testing user courses',
    imageUrl: 'http://example.com/test-image.png',
    createdBy: 'admin@example.com',
    createdAt: new Date(),
  });

  // Mock user enrolled course
  const userCourseRef = admin.firestore().collection(USER_COURSES).doc();
  testUserCourseId = userCourseRef.id;
  await userCourseRef.set({
    userId: testUserId,
    courseId: testCourseId,
    role: 'student',
    enrolledAt: new Date(),
  });
});

// Cleanup after tests
afterAll(async () => {
  if (testCourseId) {
    await admin.firestore().collection(COURSES).doc(testCourseId).delete();
  }
  if (testUserCourseId) {
    await admin.firestore().collection(USER_COURSES).doc(testUserCourseId).delete();
  }
  server.close();
  await admin.firestore().terminate();
});

describe('User Course Controller', () => {
  
  test('should enroll a user in a course successfully', async () => {
    const response = await supertest(app)
      .post(`/user/${testUserId}/course/${testCourseId}/enroll`)
      .send({ role: 'student' })
      .expect(201);

    expect(response.body).toHaveProperty('message', 'Enrolled in course successfully');
    expect(response.body).toHaveProperty('id');
  });

  test('should fetch all courses for a user successfully', async () => {
    const response = await supertest(app)
      .get(`/user/${testUserId}/courses`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('courseId');  // Ensure 'courseId' exists
    expect(response.body[0]).toHaveProperty('userId', testUserId);  // Ensure 'userId' exists
  });

  test('should fetch suggested courses for a user successfully', async () => {
    const response = await supertest(app)
      .get(`/user/${testUserId}/suggested-courses`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');  // Ensure 'id' exists for suggested course
    expect(response.body[0]).toHaveProperty('courseType');  // Ensure 'courseType' exists
  });

  test('should fetch course details for a user successfully', async () => {
    const response = await supertest(app)
      .get(`/user/${testUserId}/course-details`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');  // Ensure 'id' exists
    expect(response.body[0]).toHaveProperty('courseType');  // Ensure 'courseType' exists
  });
});
