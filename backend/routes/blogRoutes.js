const express = require('express');
const { createBLog, getBLogs, getBLog, updateBLog, deleteBLog, toggleLike, addComment } = require('../controllers/blogController');
const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware'); 

router.post('/blogs', userMiddleware, createBLog);
router.get('/blogs', getBLogs);
router.get('/blogs/:id', getBLog);
router.patch('/blogs/:id', userMiddleware, updateBLog);
router.delete('/blogs/:id', userMiddleware, deleteBLog);
// protect here is middleware to verify user authentication
router.put('/blogs/:id/like', userMiddleware, toggleLike);
router.post('/blogs/:id/comment', userMiddleware, addComment);
module.exports = router;

