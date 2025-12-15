const express = require('express');
const { createBLog, getBLogs, getBLog, getMyBlogs, updateBLog, deleteBLog, toggleLike, addComment, deleteComment } = require('../controllers/blogController');
const router = express.Router();

const userMiddleware = require('../middleware/userMiddleware'); 
const upload = require('../middleware/uploadMiddleware'); 

// single('image') means single file with field name 'image'
router.post('/', userMiddleware, upload.single('image'), createBLog);


router.get('/', getBLogs);
router.get('/my-posts', userMiddleware, getMyBlogs);
router.get('/:id', getBLog);
router.patch('/:id', userMiddleware, updateBLog);
router.delete('/:id', userMiddleware, deleteBLog);

router.put('/:id/like', userMiddleware, toggleLike);
router.post('/:id/comment', userMiddleware, addComment);
router.delete('/:id/comment/:commentId', userMiddleware, deleteComment);

module.exports = router;

