import { signupUser, loginUser, logoffUser } from 'server/controllers/userController.mjs';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import admin from 'server/config/firebase.mjs';

describe('User Controller', () => {
    // Array to store all user IDs created during testing
    const createdUserIds = [];
    let testEmail;
    const TEST_PASSWORD = 'password123';

    // Helper function to create mock request and response objects
    const createMockRequestResponse = (body) => {
        const req = mockRequest({ body });
        const res = mockResponse();
        return { req, res };
    };

    // Before each test, create a new user
    beforeEach(async () => {
        // Generate a unique email for each test
        testEmail = `testuser+${Date.now()}@example.com`;
        const { req, res } = createMockRequestResponse({
            name: 'Test User',
            email: testEmail,
            password: TEST_PASSWORD,
            userType: 'student',
        });

        // Sign up the user
        await signupUser(req, res);
        const createdUserId = res.send.mock.calls[0][0].user.uid;
        createdUserIds.push(createdUserId);
    });

    // After all tests, clean up created users and their data
    afterAll(async () => {
        for (const userId of createdUserIds) {
            try {
                // Delete user from Firebase Authentication
                await admin.auth().deleteUser(userId);

                // Delete user document from Firestore
                const userDocRef = admin.firestore().collection('users').doc(userId);
                await userDocRef.delete();
            } catch (error) {
                console.error(`Failed to delete user or Firestore document with UID: ${userId}`, error);
            }
        }

        // Ensure Firebase Admin SDK is properly terminated
        await admin.firestore().terminate();
    }, 30000); 

    // Test user signup functionality
    describe('signupUser', () => {
        it('should sign up a new user successfully', async () => {
            expect(createdUserIds[createdUserIds.length - 1]).toBeDefined();
        });
    });

    // Test user login functionality
    describe('loginUser', () => {
        it('should log in a user successfully', async () => {
            const { req, res } = createMockRequestResponse({
                email: testEmail,
                password: TEST_PASSWORD,
            });

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                message: 'User logged in successfully',
                token: expect.any(String),
                user: expect.objectContaining({ uid: expect.any(String) }),
            }));
        });
    });

    // Test user logoff functionality
    describe('logoffUser', () => {
        it('should log off a user successfully', async () => {
            const reqLogoff = mockRequest({
                user: { uid: createdUserIds[createdUserIds.length - 1] },
            });
            const resLogoff = mockResponse();

            await logoffUser(reqLogoff, resLogoff);

            expect(resLogoff.status).toHaveBeenCalledWith(200);
            expect(resLogoff.send).toHaveBeenCalledWith(expect.objectContaining({
                message: 'User logged off successfully',
            }));
        });
    });
});
