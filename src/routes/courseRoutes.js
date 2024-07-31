const express = require('express');
const { createCourse , getCourse , getAllCourses , updateCourse , deleteCourse  } = require('../controllers/courseController');
// const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

// route to get all courses 
router.get('/', getAllCourses);

// route to get course data by uid
router.get('/:uid', getCourse);

//route for create course
router.post('/createCourse', createCourse);

// route for Delete Course
router.delete('/deleteCourse/:uid', deleteCourse);

// route for updating Course 
router.patch('/updateCourse/:uid', updateCourse);


// // route to get all courses 
// router.get('/', verifyToken, getAllCourses);

// // route to get course data by uid
// router.get('/:uid', verifyToken, getCourse);

// //route for create course
// router.post('/createcourse', createCourse);

// // route for Delete Course
// router.delete('/deletecourse/:uid', deleteCourse);

// // route for updating Course 
// router.patch('/update-profile/:uid', verifyToken, updateCourse);


module.exports = router;
