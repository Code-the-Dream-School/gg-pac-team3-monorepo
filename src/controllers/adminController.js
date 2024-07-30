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

// Function to create a new user
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const adminUid = req.adminUid;
  // console.log('Creating user with admin UID:', adminUid);

  try {
    const userRecord = await admin.auth().createUser({
      displayName: name,
      email,
      password,
    });
    // console.log('User created:', userRecord);

    if (role === 'admin') {
      await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
      // console.log('Admin claim set for new user:', userRecord.uid);
    }

    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      IsAdmin: role === 'admin',
      createdBy: adminUid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    // console.log('New user details saved in Firestore:', userRecord.uid);

    res.status(201).json(userRecord);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a user created by the admin
const deleteUser = async (req, res) => {
  const { uid } = req.params;
  const adminUid = req.adminUid;
  // console.log('Deleting user with admin UID:', adminUid);

  try {
    const userRecord = await db.collection('users').doc(uid).get();
    // console.log('User record to be deleted:', userRecord);

    if (userRecord.exists && userRecord.data().createdBy === adminUid) {
      await admin.auth().deleteUser(uid);
      await db.collection('users').doc(uid).delete();
      // console.log('User deleted:', uid);
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      // console.log('Permission denied: User not created by this admin');
      res.status(403).json({ error: 'Permission denied' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyAdmin,
  createUser,
  deleteUser,
};
