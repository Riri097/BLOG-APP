const express = require('express');
const { createBLog, getBLogs, getBLog, updateBLog, deleteBLog } = require('../controllers/blogController');
const router = express.Router();

router.post('/blogs', createBLog);
router.get('/blogs', getBLogs);
router.get('/blogs/:id', getBLog);
router.patch('/blogs/:id', updateBLog);
router.delete('/blogs/:id', deleteBLog);

module.exports = router;

