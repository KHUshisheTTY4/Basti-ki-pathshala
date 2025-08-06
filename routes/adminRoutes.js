// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllApplicants } = require('../controllers/adminController');

router.get('/applicants', getAllApplicants);

module.exports = router;
