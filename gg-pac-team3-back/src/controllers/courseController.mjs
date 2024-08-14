import dotenv from 'dotenv';
import admin from '../config/firebase.mjs';
import axios from 'axios';
import CourseModel from '../models/CourseModel.mjs';
import { COURSES, USERS  } from './constants.mjs';

dotenv.config();
const db = admin.firestore();

// Create a new course
export const createCourse = async (req, res) => {   
    const courseData = req.body;    

    try {
        console.log(req.user.uid)
         // Fetch user data
        const userRef = db.collection(USERS).doc(req.user.uid);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send({ message: 'User not found' });
        }
        const userData = userDoc.data();        

        // Check if userType is 'Teacher'
        if (userData.userType !== 'Teacher') {
            return res.status(403).send({ message: 'Only teachers can create courses' });
        }

        // Create a new course
        const newCourse = new CourseModel(courseData);      
        const courseRef = db.collection(COURSES).doc(); // Generate a new document ID
        await courseRef.set(newCourse.toFirestore());

        res.status(201).send({ message: 'Course created successfully', courseId: courseRef.id });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send({ error: error.message });
    }
};

// Fetch a specific course by ID
export const getCourse = async (req, res) => {
    const { uid } = req.params;

    try {
        const courseDoc = await db.collection(COURSES).doc(uid).get();

        if (!courseDoc.exists) {
            return res.status(404).send({ message: 'Course not found' });
        }

        const courseData = CourseModel.fromFirestore(courseDoc.data());        
        res.status(200).send(courseData);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).send({ error: error.message });
    }
};

// Fetch all courses
export const getAllCourses = async (req, res) => {
    try {
        const coursesSnapshot = await db.collection(COURSES).get();  

        const courses = [];
        coursesSnapshot.forEach(doc => {
            courses.push({ id: doc.id, ...CourseModel.fromFirestore(doc.data()) });
        });

        res.status(200).send(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send({ error: error.message });
    }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
    const { uid } = req.params;
    const updates = req.body;

    try {        
        // Access the courses subcollection within the user document
        const courseRef = db.collection(COURSES).doc(uid);      
        const courseDoc = await courseRef.get();

        if (!courseDoc.exists) {
            return res.status(404).send({ message: 'Course not found' });
        }

        await courseRef.update(updates);
        res.status(200).send({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send({ error: error.message });
    }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
    const { uid } = req.params;

    try {
        // Access the courses subcollection within the user document        
        const courseRef = db.collection(COURSES).doc(uid);
        const courseDoc = await courseRef.get();

        if (!courseDoc.exists) {
            return res.status(404).send({ message: 'Course not found' });
        }

        await courseRef.delete();
        res.status(200).send({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send({ error: error.message });
    }
};
