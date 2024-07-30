const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define the admin routes
router.post('/create-user', adminController.verifyAdmin, adminController.createUser);
router.delete('/delete-user/:uid', adminController.verifyAdmin, adminController.deleteUser);

module.exports = router;
