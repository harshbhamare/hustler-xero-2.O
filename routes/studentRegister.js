const express = require("express");
const router = express.Router();
const studentModel = require("../models/studentModel");
const Course = require('../models/courseModel');
const { sendRegistrationEmail } = require('../utils/emailService');


router.get("/", (req, res) => {
    res.render("register");
});

router.post("/", async (req, res) => {
    
    const { 
        firstName, 
        lastName, 
        email, 
        collegeName, 
        contactNumber, 
        enrolledCourses,
        trnNumber, 
        amountPaid 
    } = req.body;

    try {
        const newStudent = new studentModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: "123456789",
            college: collegeName,
            contactNumber: contactNumber,
            enrolledCourses: enrolledCourses,
            trnNumber: trnNumber, 
            amountPaid: amountPaid,
            status: "pending",
            
        });

        const savedStudent = await newStudent.save();
        
        // This line is now correctly awaiting the promise-based function.
        // It will wait for the email to be sent before continuing.
        await sendRegistrationEmail(email, firstName);

        // This line will only run after the student is saved and the email is sent successfully.
        res.redirect("/confirmation-message")

    } catch (err) {
        console.error("Error saving student registration or sending email:", err);
        res.status(400).json({ 
            error: "Failed to register student.",
            details: err.message
        });
    }
});

module.exports = router;