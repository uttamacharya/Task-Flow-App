const express = require('express');
// const { createSection, getSections, updateSection, deleteSection } = require('../controllers/sectionController');
// const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createSection);
router.get('/', authMiddleware, getSections);
router.put('/:id', authMiddleware, updateSection);
router.delete('/:id', authMiddleware, deleteSection);

// module.exports = router;
