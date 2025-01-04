// sessionRoutes.js
const express = require('express');
const router = express.Router();
const { getAllSessions, createSession, updateSession, deleteSession } = require('../controllers/sessionController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', authenticate, getAllSessions);
router.post('/', authenticate, createSession);
router.put('/:id', authenticate, updateSession);
router.delete('/:id', authenticate, deleteSession);

module.exports = router;
