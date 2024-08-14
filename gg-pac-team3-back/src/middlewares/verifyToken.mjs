import admin from '../config/firebase.mjs'; 

export const verifyToken = async (req, res, next) => {
    const idToken = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];
    
    if (!idToken) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; // Attach the decoded token to the request object
        next();
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};


// Middleware to check if the user is a teacher
export const isTeacher = async (req, res, next) => {
    const { uid } = req.user;

    try {
        const userRef = admin.firestore().collection('users').doc(uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists || userDoc.data().userType !== 'Teacher') {
            return res.status(403).send({ error: 'Not authorized' });
        }

        next();
    } catch (error) {
        console.error('Error checking user type:', error);
        res.status(500).send({ error: 'Server error' });
    }
};