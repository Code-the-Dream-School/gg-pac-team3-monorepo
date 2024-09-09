import { 
  enrollInCourse, 
  CreateUserCourses, 
  getSuggestedCoursesForUser, 
  getUserCourses, 
  getCoursesForUser 
} from 'server/controllers/userCourseController.mjs';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import admin from 'server/config/firebase.mjs';
import { jest, describe, it, expect, beforeEach, afterAll } from '@jest/globals';

describe('User Course Controller', () => {
    let testUserId;
    let testCourseId;

    // Helper function to create mock request and response objects
    const createMockRequestResponse = (body = {}, params = {}) => {
        const req = mockRequest({ body, params });
        const res = mockResponse();
        return { req, res };
    };

    beforeEach(() => {
        testUserId = `user${Date.now()}`;
        testCourseId = `course${Date.now()}`;
    });

    afterAll(async () => {
        await admin.firestore().terminate();
    });

    describe('enrollInCourse', () => {
        it('should enroll a user in a course successfully', async () => {
            const { req, res } = createMockRequestResponse(
                { role: 'student' },
                { userId: testUserId, courseId: testCourseId }
            );

            await enrollInCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Enrolled in course successfully',
                id: expect.any(String),
            }));
        });
    });

    describe('CreateUserCourses', () => {
        it('should create a user course successfully', async () => {
            const { req, res } = createMockRequestResponse({
                userId: testUserId,
                courseId: testCourseId,
                role: 'student',
                progress: 50,
                earnedPoints: 10
            });

            await CreateUserCourses(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                message: 'create one course successfully by teacher',
                id: expect.any(String),
            }));
        });
    });

    describe('getSuggestedCoursesForUser', () => {
        it('should fetch suggested courses for a user', async () => {
            const { req, res } = createMockRequestResponse({}, { userId: testUserId });

            await getSuggestedCoursesForUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalled();
        });
    });

    describe('getUserCourses', () => {
        it('should fetch all courses a user is enrolled in or return 404 if none found', async () => {
            const { req, res } = createMockRequestResponse({}, { userId: testUserId });

            await getUserCourses(req, res);

            expect(res.status).toHaveBeenCalledWith(expect.any(Number));
            expect(res.send).toHaveBeenCalled();

            if (res.status.mock.calls[0][0] === 200) {
                expect(res.send).toHaveBeenCalledWith(expect.any(Array));
            } else {
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                    message: expect.stringContaining('No courses found')
                }));
            }
        });
    });

    describe('getCoursesForUser', () => {
        it('should fetch course details for a user or return 404 if none found', async () => {
            const { req, res } = createMockRequestResponse({}, { userId: testUserId });

            await getCoursesForUser(req, res);

            expect(res.status).toHaveBeenCalledWith(expect.any(Number));
            expect(res.send).toHaveBeenCalled();

            if (res.status.mock.calls[0][0] === 200) {
                expect(res.send).toHaveBeenCalledWith(expect.any(Array));
            } else {
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                    message: expect.stringContaining('No courses found')
                }));
            }
        });
    });
});