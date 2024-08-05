const express = require('express');
const { getUser, signupUser, loginUser, logoffUser, getAllUsers, resetPassword, updateUserProfile, deleteUser, deleteAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/verifyToken');

const router = express.Router();

// route to get all users records
router.get('/', verifyToken, getAllUsers);

// route to get user record by uid
router.get('/:uid', verifyToken, getUser);

//route for user signup
router.post('/signup', signupUser);

//route for user login
router.post('/login', loginUser);

//route for user logoff
router.post('/logoff/:uid', verifyToken, logoffUser);

// route for resetting password
router.post('/resetpassword', resetPassword);

// New route for updating user profile
router.patch('/update-profile/:uid', verifyToken, updateUserProfile);


module.exports = router;
