const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/me', userMiddleware, userController.getMe);
router.put('/update', userMiddleware, userController.updateAccount); // PUT is for updating
router.delete('/delete', userMiddleware, userController.deleteAccount); // DELETE is for deleting

module.exports = router;