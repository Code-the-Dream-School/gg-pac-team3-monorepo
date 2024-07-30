const admin = require('firebase-admin');
const serviceAccount = require('../../learninghub-ggpacteam3-firebase-adminsdk-zexw0-e7cfeb2116.json')
// const serviceAccount = require('../../Private_Key.json');
// console.log('Service account details:', serviceAccount);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
    // console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
}

module.exports = admin;

// https://console.firebase.google.com/project/learninghub-ggpacteam3/database
