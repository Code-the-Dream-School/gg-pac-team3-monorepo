require('dotenv').config();
const admin = require('../config/firebase');
const db = admin.firestore();
const axios = require('axios');
const CourseModel = require('../models/CourseModel'); 

// Create a new course
exports.createCourse = async (req, res) => {
    const courseData = req.body;
   
    try {
        const newCourse = new CourseModel(courseData);
        const courseRef = db.collection('Courses').doc(); // Generate a new document ID
        await courseRef.set(newCourse.toFirestore());

        res.status(201).send({ message: 'Course created successfully', courseId: courseRef.id });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).send({ error: error.message });
    }
};

// Fetch a specific course by ID
exports.getCourse = async (req, res) => {
    const { uid } = req.params;

    try {
        const courseDoc = await db.collection('Courses').doc(uid).get();

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
exports.getAllCourses = async (req, res) => {
    try {
        const coursesSnapshot = await db.collection('Courses').get();  

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
exports.updateCourse = async (req, res) => {
    const { uid } = req.params;
    const updates = req.body;

    try {
        const courseRef = db.collection('Courses').doc(uid);
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
exports.deleteCourse = async (req, res) => {
    const { uid } = req.params;

    try {
        const courseRef = db.collection('Courses').doc(uid);
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
