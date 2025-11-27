const express = require('express');
const { createBLog, getBLogs, getBLog, updateBLog, deleteBLog } = require('../controllers/blogController');
const router = express.Router();

router.post('/blogs', createBLog);

router.get('/blogs', getBLogs);
router.get('/blog/:id', getBLog);
router.patch('/blog/:id', updateBLog);
router.delete('/blog/:id', deleteBLog);
module.exports = router;

