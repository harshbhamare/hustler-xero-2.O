const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const courses = require('../models/courseModel');
const Course = require('../models/courseModel');
const isAuthenticated = require('../middlewares/auth');
const { sendPaymentConfirmationEmail } = require('../utils/emailService');



router.post('/add', isAuthenticated, async (req, res) => {
    const {
        title, category, level, duration, price, Nmin, Nmax, description, curriculum,
        image,
        instructorName, 
        expertise,
        linkedIn,
        profileImage 
    } = req.body;

    try {
        const instructor = {
            name: instructorName, 
            expertise: expertise,
            linkedIn: linkedIn,
            profileImage: profileImage
        };

        const newCourse = new courses({
            title, category, level, duration, price, Nmin, Nmax, description, curriculum,
            image,
            instructor
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

// router.post("/update-status/:id", isAuthenticated, async (req, res) => {
//     try {
//         const studentId = req.params.id;
//         const { trnNumber, amountPaid, status } = req.body;

//         const student = await Student.findById(studentId);

//         if (!student) {
//             return res.status(404).send("Student not found.");
//         }

//         const courseTitle = student.enrolledCourses[0];

//         if (!courseTitle) {
//             return res.status(404).send("Enrolled course not found on student record.");
//         }

//         const updatedStudent = await Student.findByIdAndUpdate(
//             studentId, 
//             { trnNumber, amountPaid, status }, 
//             { new: true }
//         );

//         sendPaymentConfirmationEmail(
//             student.email,
//             student.firstName,
//             courseTitle,
//             amountPaid,
//             trnNumber
//         );

//         const allStudents = await Student.find({});
//         const allCourses = await Course.find({});

//         res.render('admin', { students: allStudents, courses: allCourses });

//     } catch (error) {
//         console.error("Error updating payment status:", error);
//         res.status(500).send("An error occurred while updating the student status.");
//     }
// });

router.post("/update-status/:id", isAuthenticated, async (req, res) => {
    try {
        const studentId = req.params.id;
        const { trnNumber, amountPaid, status } = req.body;

        // 1. Find the student by ID.
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).send("Student not found.");
        }

        // 2. We have the course title as a string on the student object.
        const courseTitle = student.enrolledCourses[0];

        if (!courseTitle) {
            return res.status(404).send("Enrolled course not found on student record.");
        }

        // 3. Update the student's record with the new payment information.
        await Student.findByIdAndUpdate(
            studentId, 
            { trnNumber, amountPaid, status }, 
            { new: true }
        );

        // 4. Send the payment confirmation email.
        sendPaymentConfirmationEmail(
            student.email,
            student.firstName,
            courseTitle, // Directly use the course title string
            amountPaid,
            trnNumber
        );

        // 5. Fetch all students and courses for the admin view.
        const allStudents = await Student.find({});
        const allCourses = await Course.find({});

        // 6. Render the admin page with the fetched data.
        res.render('admin', { students: allStudents, courses: allCourses });

    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).send("An error occurred while updating the student status.");
    }
});

module.exports = router;