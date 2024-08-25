import admin from '../../server/config/firebase.mjs';
import {
    createQuiz,
    getQuiz,
    getAllQuizzesForLesson,
    updateQuiz,
    deleteQuiz,
} from '../../server/controllers/quizController.mjs';
import { COURSES, LESSONS, QUIZZES } from '../../server/controllers/constants.mjs';
import supertest from 'supertest';
import express from 'express';

const app = express();
app.use(express.json());

// Middleware to simulate authenticated user
const simulateAuth = (req, res, next) => {
    req.user = { uid: 'testUserId' }; 
    next();
};

// Route setup for quiz endpoints
app.post('/course/:courseId/lesson/:lessonId/quiz', simulateAuth, createQuiz);
app.get('/course/:courseId/lesson/:lessonId/quiz/:quizId', simulateAuth, getQuiz);
app.get('/course/:courseId/lesson/:lessonId/quizzes', simulateAuth, getAllQuizzesForLesson);
app.patch('/course/:courseId/lesson/:lessonId/quiz/:quizId', simulateAuth, updateQuiz);
app.delete('/course/:courseId/lesson/:lessonId/quiz/:quizId', simulateAuth, deleteQuiz);

let testCourseId;
let testLessonId;
let testQuizId;
let server;

beforeAll(async () => {
    server = app.listen(4002);
    const courseRef = admin.firestore().collection(COURSES).doc();
    await courseRef.set({
        courseName: 'Test Course',
        createdBy: 'test@example.com',
    });
    testCourseId = courseRef.id;

    const lessonRef = courseRef.collection(LESSONS).doc();
    await lessonRef.set({
        title: 'Test Lesson',
    });
    testLessonId = lessonRef.id;
});

afterAll(async () => {
    if (testQuizId) {
        await admin.firestore().collection(COURSES).doc(testCourseId).collection(LESSONS).doc(testLessonId).collection(QUIZZES).doc(testQuizId).delete();
    }
    await admin.firestore().collection(COURSES).doc(testCourseId).collection(LESSONS).doc(testLessonId).delete();
    await admin.firestore().collection(COURSES).doc(testCourseId).delete();
    server.close();
    await admin.firestore().terminate();
});

describe('Quiz Controller', () => {
    test('should create a new quiz successfully', async () => {
        // This test verifies that a new quiz can be created successfully
        const quizData = {
            title: 'Test Quiz',
            questions: [
                { question: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' },
            ],
        };

        const response = await supertest(app)
            .post(`/course/${testCourseId}/lesson/${testLessonId}/quiz`)
            .send(quizData)
            .expect(201);

        expect(response.body.message).toBe('Quiz created successfully');
        expect(response.body.quizId).toBeDefined();

        testQuizId = response.body.quizId; // Store the quizId for subsequent tests
    });

    test('should fetch a specific quiz successfully', async () => {
        // This test verifies that a specific quiz can be fetched by its ID
        const response = await supertest(app)
            .get(`/course/${testCourseId}/lesson/${testLessonId}/quiz/${testQuizId}`)
            .expect(200);

        expect(response.body.title).toBe('Test Quiz');
    });

    test('should fetch all quizzes for a lesson successfully', async () => {
        // This test checks that all quizzes for a given lesson can be retrieved
        const response = await supertest(app)
            .get(`/course/${testCourseId}/lesson/${testLessonId}/quizzes`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].title).toBe('Test Quiz');
    });

    test('should update a quiz successfully', async () => {
        // This test ensures that a quiz can be updated successfully
        const updates = { title: 'Updated Test Quiz' };

        const response = await supertest(app)
            .patch(`/course/${testCourseId}/lesson/${testLessonId}/quiz/${testQuizId}`)
            .send(updates)
            .expect(200);

        expect(response.body.message).toBe('Quiz updated successfully');

        const fetchResponse = await supertest(app)
            .get(`/course/${testCourseId}/lesson/${testLessonId}/quiz/${testQuizId}`)
            .expect(200);

        expect(fetchResponse.body.title).toBe('Updated Test Quiz');
    });

    test('should delete a quiz successfully', async () => {
        // This test confirms that a quiz can be deleted successfully
        const response = await supertest(app)
            .delete(`/course/${testCourseId}/lesson/${testLessonId}/quiz/${testQuizId}`)
            .expect(200);

        expect(response.body.message).toBe('Quiz deleted successfully');

        // Verify that the quiz is no longer found after deletion
        await supertest(app)
            .get(`/course/${testCourseId}/lesson/${testLessonId}/quiz/${testQuizId}`)
            .expect(404);
    });
});
