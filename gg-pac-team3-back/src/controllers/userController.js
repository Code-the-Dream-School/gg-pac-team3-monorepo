require('dotenv').config();
const admin = require('../config/firebase');
const db = admin.firestore();
const axios = require('axios');
const UsersModel = require('../models/UsersModel')
// const UsersModel = require('./models/UsersModel'); 

exports.signupUser = async (req, res) => {
    // console.log(req.body)
    const { name, email, password, IsAdmin } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userRecord = await admin.auth().createUser({
            displayName: name,
            email,
            password
        });
        // console.log('User created:', userRecord);

        if (IsAdmin) {
            await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
            // console.log('Admin claim set for user:', userRecord.uid);
        }

        // URL of the default profile picture served by your server
        const defaultProfilePicture = 'http://localhost:8000/images/userProfileImage.jpg';
        const defaultProfilePicture1 = 'gs://learninghub-ggpacteam3.appspot.com/images/userProfileImage.jpg';
        //gs://learninghub-ggpacteam3.appspot.com/images/userProfileImage.jpg
        // https://console.firebase.google.com/u/0/project/learninghub-ggpacteam3/storage/learninghub-ggpacteam3.appspot.com/files

        // Initialize and defining user collection fields
        // const user = new UsersModel({
        //     name,
        //     email,
        //     profilePicture: 'gs://learninghub-ggpacteam3.appspot.com/images/userProfileImage.jpg' // Use your default image URL
        //   });

        //   await db.collection('users').doc(userRecord.uid).set(user.toFirestore());
        await db.collection('users').doc(userRecord.uid).set({
            name,
            email,
            IsAdmin,
            profilePicture: defaultProfilePicture1,
            loginType: null,
            adminCode: null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            lastLogin: null, 
            lastLogout: null
            
        });
        // console.log('User details saved in Firestore:', userRecord.uid);

        res.status(201).send({ message: 'User signed up successfully', user: userRecord });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(400).send({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {        
        const apiKey = process.env.FIREBASE_API_KEY;        

        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            email,
            password,
            returnSecureToken: true
        });

        const idToken = response.data.idToken;
        const userRecord = await admin.auth().getUserByEmail(email);        

        // Update last login timestamp
        await db.collection('users').doc(userRecord.uid).update({
            lastLogin: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).send({ message: 'User logged in successfully', token: idToken, user: userRecord });
    } catch (error) {
        console.error('Error logging in user:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data); // Log the error response data
        }
        res.status(400).send({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    const { uid } = req.params;

    try {
        const userRecord = await admin.auth().getUser(uid);
        res.status(200).send(userRecord);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(400).send({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').get();
        if (usersSnapshot.empty) {
            return res.status(404).send({ message: 'No users found' });
        }
        
        const users = [];
        usersSnapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: error.message });
    }
};

exports.logoffUser = async (req, res) => {
    try {
        const { uid } = req.params;
        if (!uid) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        await admin.auth().revokeRefreshTokens(uid);
        
        // Update last logout timestamp
        await db.collection('users').doc(uid).update({
            lastLogout: admin.firestore.FieldValue.serverTimestamp()
        });

        res.status(200).send({ message: 'User logged off successfully' });
    } catch (error) {
        console.error('Error logging off user:', error);
        res.status(400).send({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }

    try {
        const apiKey = process.env.FIREBASE_API_KEY;

        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`, {
            requestType: 'PASSWORD_RESET',
            email
        });

        res.status(200).send({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
        }
        res.status(400).send({ error: error.message });
    }
};


exports.updateUserProfile = async (req, res) => {
    const { uid } = req.params; // User ID from URL params
    const { displayName, photoURL } = req.body; // New name and profile picture URL

    if (!uid || (!displayName && !photoURL)) {
        return res.status(400).json({ error: 'User ID and at least one field to update are required' });
    }

    try {
        const updates = {};
        if (displayName) updates.displayName = displayName;
        if (photoURL) updates.photoURL = photoURL;

        const userRecord = await admin.auth().updateUser(uid, updates);
        
        res.status(200).send({ message: 'User profile updated successfully', user: userRecord });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(400).send({ error: error.message });
    }
};


