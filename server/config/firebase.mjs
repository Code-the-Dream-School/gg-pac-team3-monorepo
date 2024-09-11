import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if we are in a production environment
const isProduction = process.env.NODE_ENV === 'production';

let serviceAccountPath;
let serviceAccount;

if (isProduction) {
  // In production (e.g., Render), read the service account from the secret file
  serviceAccountPath = '/etc/secrets/firebase-admin-key.json'; 
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
} else {
  // In local development, use the Firebase Admin SDK JSON file from your local system
  serviceAccountPath = join(__dirname, '../../learninghub-ggpacteam3-firebase-adminsdk-zexw0-e7cfeb2116.json');
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
}

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
}

export default admin;
