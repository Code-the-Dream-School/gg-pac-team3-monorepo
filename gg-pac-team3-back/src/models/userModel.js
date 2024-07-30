const admin = require('../config/firebase');
const firestore = admin.firestore();

const createUserRecord = async (adminUid, userUid) => {
  try {
    await firestore.collection('adminUsers').doc(userUid).set({
      createdBy: adminUid,
    });
    // console.log('User record created successfully.');
  } catch (error) {
    console.error('Error creating user record:', error);
  }
};

const getUserRecord = async (userUid) => {
  try {
    const userDoc = await firestore.collection('adminUsers').doc(userUid).get();
    if (userDoc.exists) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user record:', error);
    return null;
  }
};

module.exports = {
  createUserRecord,
  getUserRecord,
};
