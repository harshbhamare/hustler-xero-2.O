const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const courses = require('../models/courseModel');
const Course = require('../models/courseModel');
const { sendPaymentConfirmationEmail } = require('../utils/emailService');



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

        // 1. Find the student by ID. We use `findById` to get the original student data.
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).send("Student not found.");
        }

        // 2. We assume the first course in the enrolledCourses array is the one we care about.
        // The value in this array is the course title, not an ID.
        const courseTitle = student.enrolledCourses[0];

        if (!courseTitle) {
            return res.status(404).send("Enrolled course not found on student record.");
        }

        // 3. Update the student's record with the new payment information.
        // We do this after getting the necessary data for the email.
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId, 
            { trnNumber, amountPaid, status }, 
            { new: true }
        );

        // 4. Send the payment confirmation email.
        // We use the `student` object's email and firstName, and the `courseTitle` we extracted.
        sendPaymentConfirmationEmail(
            student.email,
            student.firstName,
            courseTitle, // Directly use the course title from the student's record
            amountPaid,
            trnNumber
        );

        // 5. Fetch all students for the admin view and re-render the page.
        // We need to fetch the courses here to pass them to the EJS template.
        const allStudents = await Student.find({});
        const allCourses = await Course.find({});

        res.render('admin', { students: allStudents, courses: allCourses });

    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).send("An error occurred while updating the student status.");
    }
});

module.exports = router;