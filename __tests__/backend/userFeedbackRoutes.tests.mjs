import supertest from 'supertest';
import express from 'express';
import admin from '../../server/config/firebase.mjs';
import { AddUserFeedback } from '../../server/controllers/userFeedbackController.mjs';

// Setup Express app and routes for testing
const app = express();
app.use(express.json());

app.post('/user/feedback', AddUserFeedback);

let server;

// Setup Firestore mock data for tests
beforeAll(() => {
  server = app.listen(4000);
});

afterAll(() => {
  server.close();
});

describe('User Feedback Controller', () => {
  test('should save user feedback successfully', async () => {
    const feedbackData = {
      userId: 'testUserId',
      courseId: 'testCourseId',  // Ensure the courseId is provided
      feedback: 'This is a test feedback',
      rating: 5,
    };

    const response = await supertest(app)
      .post('/user/feedback')
      .send(feedbackData)
      .expect(201);

    // Verify response
    expect(response.body.message).toBe('User feedback saved successfully');
  });
});
