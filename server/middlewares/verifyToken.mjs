import admin from '../config/firebase.mjs';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    let decodedToken;
    try {
      // Attempt to verify the token as a Firebase ID token
      decodedToken = await admin.auth().verifyIdToken(token);
    } catch (idTokenError) {
      // If verification fails, check if it's a custom token by decoding manually
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      const decodedPayload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      if (decodedPayload && decodedPayload.uid) {
        decodedToken = { uid: decodedPayload.uid };
      } else {
        throw new Error('Invalid token payload');
      }
    }

    // Attach the decoded token to the request object
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
};

/**
 * @swagger
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Middleware to check if the user is a teacher
export const isTeacher = async (req, res, next) => {
  const { uid } = req.user;

  try {
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(403).json({ error: 'User not found' });
    }

    const userData = userDoc.data();

    if (!userData || userData.userType !== 'Teacher') {
      return res.status(403).json({ error: 'Not authorized as teacher' });
    }

    next();
  } catch (error) {
    console.error('Error checking user type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
