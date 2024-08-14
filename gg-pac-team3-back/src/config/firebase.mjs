import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccountPath = join(__dirname, '../../learninghub-ggpacteam3-firebase-adminsdk-zexw0-e7cfeb2116.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
    });
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
}

export default admin;