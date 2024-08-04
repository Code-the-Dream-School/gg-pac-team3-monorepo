const admin = require('../config/firebase');
const db = admin.firestore();

// Middleware to verify admin user
const verifyAdmin = async (req, res, next) => {
  const idToken = req.headers.authorization.split('Bearer ')[1];
  // console.log('Received ID Token:', idToken);

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // console.log('Decoded Token:', decodedToken);

    if (decodedToken.admin) {
      req.adminUid = decodedToken.uid;
      // console.log('Admin UID:', req.adminUid);
      next();
    } else {
      // console.log('Unauthorized: User is not an admin');
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(403).json({ error: 'Unauthorized' });
  }
};

module.exports = {
  verifyAdmin,
};
