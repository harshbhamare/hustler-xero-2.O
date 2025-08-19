const express = require("express");
const router = express.Router();
const Course = require('../models/courseModel');
const Student = require('../models/studentModel');
const isAuthenticated = require('../middlewares/auth');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const students = await Student.find({});
        const courses = await Course.find({});

        res.render('admin', { students: students, courses: courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
