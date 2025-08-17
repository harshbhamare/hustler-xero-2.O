const express = require("express");
const router = express.Router();
const Course = require('../models/courseModel');
const Student = require('../models/studentModel');

// router.get("/", (req, res) => {
//     // res.render("admin");
//     res.render('admin', { students: students });
// });



// GET route to display the dashboard
router.get('/', async (req, res) => {
    try {
        // Fetch all registered students from the database
        const students = await Student.find({});

        // You can also fetch courses if needed
        const courses = await Course.find({});

        // Render the admin dashboard with the fetched data
        res.render('admin', { students: students, courses: courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
