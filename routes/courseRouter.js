const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const courses = require('../models/courseModel');


router.post('/add', async (req, res) => {
    const { 
        title, category, level, duration, price, Nmin, Nmax, description, curriculum, 
        image, 
        instructorName, // Correctly destructuring the name from the form
        expertise, 
        linkedIn,
        profileImage // Correctly destructuring the image URL
    } = req.body;

    try {
        // Create an instructor object with the correct field names to match the schema.
        const instructor = {
            name: instructorName, // <-- This is the fix. 'name' is assigned 'instructorName' from the form
            expertise: expertise,
            linkedIn: linkedIn,
            profileImage: profileImage // <-- This is also fixed
        };

        // Create a new Course document with the correctly structured data.
        const newCourse = new courses({
            title, category, level, duration, price, Nmin, Nmax, description, curriculum,
            image,
            instructor // <-- Pass the correctly structured 'instructor' object
        });

        await newCourse.save();

        res.status(201).json({ 
            message: 'Course added successfully!',
            course: newCourse
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ 
            message: 'Failed to add course.',
            error: err.message 
        });
    }
});

router.post("/update-status/:id", async (req, res) => {
    try {
        const studentId = req.params.id;

        const { trnNumber, amountPaid, status } = req.body;

        await Student.findByIdAndUpdate(studentId, { 
            trnNumber, 
            amountPaid, 
            status 
        }, { new: true });

        const students = await Student.find({})
            .populate('enrolledCourses.courseId')
            .exec(); 

        res.render('admin', { students: students, courses: courses });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred.");
    }
});

module.exports = router;