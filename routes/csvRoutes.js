const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');

router.get('/downloadCsv', csvController.downloadCsv);

module.exports = router;
