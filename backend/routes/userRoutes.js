const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');

const { 
    signup,
    login, 
    getMe,
    updateAccount, 
    deleteAccount 
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', userMiddleware, getMe);
router.put('/update', userMiddleware, updateAccount); 
router.delete('/delete', userMiddleware, deleteAccount); 

module.exports = router;