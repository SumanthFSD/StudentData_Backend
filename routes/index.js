const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const studentRoutes = require('./studentRoutes');
const interviewRoutes = require('./interviewRoutes');
const jobRoutes = require('./jobRoutes');
const csvRoutes = require('./csvRoutes');

router.use('/', authRoutes);
router.use('/students', studentRoutes);
router.use('/interviews', interviewRoutes);
router.use('/jobs', jobRoutes);
router.use('/csv', csvRoutes);

module.exports = router;
