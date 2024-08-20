import dotenv from 'dotenv';
import admin from '../config/firebase.mjs';
import axios from 'axios';
import UsersModel from '../models/UsersModel.mjs'; 
import { USERS } from './constants.mjs';

dotenv.config();
const db = admin.firestore();

export const signupUser = async (req, res) => {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password || !userType) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const userRecord = await admin.auth().createUser({
            name,
            email,
            password,
            userType
        });
       
        const defaultprofilePictureUrl = 'https://firebasestorage.googleapis.com/v0/b/learninghub-ggpacteam3.appspot.com/o/images%2FuserProfileImage.jpg?alt=media';

        
        const user = new UsersModel({
            name,
            email,
            userType,
            profilePictureUrl: defaultprofilePictureUrl
        });

        await db.collection(USERS).doc(userRecord.uid).set(user.toFirestore());

        res.status(201).send({ message: 'User signed up successfully', user: userRecord });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send({ error: error.message });
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const apiKey = process.env.FIREBASE_API_KEY;

        // Send login request to Firebase Authentication
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            email,
            password,
            returnSecureToken: true
        });

        const idToken = response.data.idToken;

        // Retrieve user record from Firebase Authentication
        const userRecord = await admin.auth().getUserByEmail(email);
        const userSnapshot = await db.collection('users').doc(userRecord.uid).get();
        const userData = userSnapshot.exists ? userSnapshot.data() : {};

        res.status(200).send({ message: 'User logged in successfully', token: idToken, user: { ...userRecord, ...userData } });
    } catch (error) {
        if (error.response) {
            const { error: errorDetails } = error.response.data;           
            // Handle specific Firebase Authentication error codes
            switch (errorDetails.message) {
                case 'INVALID_LOGIN_CREDENTIALS':                    
                    res.status(401).send({ error: 'Incorrect email or password. Please try again.' });
                    break;
                case 'INVALID_PASSWORD':
                    res.status(401).send({ error: 'Incorrect password. Please try again.' });
                    break;
                case 'INVALID_EMAIL':
                    res.status(400).send({ error: 'Invalid email address. Please check and try again.' });
                    break;
                case 'EMAIL_NOT_FOUND':
                    res.status(404).send({ error: 'Email not registered. Please sign up first.' });
                    break;
                case 'USER_DISABLED':
                    res.status(403).send({ error: 'User account has been disabled.' });
                    break;
                default:
                    res.status(401).send({ error: 'Incorrect email or password. Please try again.' });
            }
        } else {
            res.status(500).send({ error: 'An unexpected error occurred. Please try again later.' });
        }
    }
};

export const getUser = async (req, res) => {
    const { uid } = req.params;

    try {
        const userRecord = await admin.auth().getUser(uid);
        res.status(200).send(userRecord);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const usersSnapshot = await db.collection(USERS).get();
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

export const getUserDashboard = async (req, res) => {
    const { uid } = req.user; 

    try {
        const userSnapshot = await db.collection(USERS).doc(uid).get();
        
        if (!userSnapshot.exists) {
            return res.status(404).send({ message: 'User not found' });
        }
        
        const userData = userSnapshot.data();
        res.status(200).send(userData);
    } catch (error) {
        console.error('Error fetching user dashboard:', error);
        res.status(500).send({ error: error.message });
    }
};

export const logoffUser = async (req, res) => {
    try {
        const { uid } = req.user; 
        if (!uid) {
            return res.status(400).send({ error: 'User ID is required' });
        }

        await admin.auth().revokeRefreshTokens(uid);        

        res.status(200).send({ message: 'User logged off successfully' });
    } catch (error) {
        console.error('Error logging off user:', error);
        res.status(400).send({ error: error.message });
    }
};

export const resetPassword = async (req, res) => {
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
        res.status(500).send({ error: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const { uid } = req.params; // User ID from URL params
    const { name, profilePictureUrl } = req.body; // New name and profile picture URL

    // Check if UID is provided
    if (!uid) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    // Prepare the updates object
    const updates = {};
    if (name) {
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Invalid name' });
        }
        updates.name = name; // Update name field in Firebase Authentication
    }
    if (profilePictureUrl) {
        if (typeof profilePictureUrl !== 'string' || !profilePictureUrl.startsWith('http')) {
            return res.status(400).json({ error: 'Invalid profilePictureUrl' });
        }
        updates.photoURL = profilePictureUrl; // Update photoURL field in Firebase Authentication
    }

    try {
        // Update the user profile in Firebase Authentication
        const userRecord = await admin.auth().updateUser(uid, updates);

        res.status(200).send({ message: 'User profile updated successfully', user: userRecord });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send({ error: error.message });
    }
};
