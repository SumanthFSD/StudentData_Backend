const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

router.get('/', interviewController.listInterviews);
router.get('/create', interviewController.renderCreateInterviewForm);
router.post('/create', interviewController.createInterview);
router.get('/markResult', interviewController.renderMarkResultStatusForm);
router.post('/markResult', interviewController.markResultStatus);

module.exports = router;
