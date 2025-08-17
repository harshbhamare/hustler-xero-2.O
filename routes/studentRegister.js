const express = require("express");
const router = express.Router();
const studentModel = require("../models/studentModel")
const Course = require('../models/courseModel');


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

        // console.log("New student registration saved:", savedStudent);
        res.status(201).json({ 
            message: "Student registered successfully!",
            data: savedStudent
        });

    } catch (err) {
        console.error("Error saving student registration:", err);
        res.status(400).json({ 
            error: "Failed to register student.",
            details: err.message
        });
    }
});
module.exports = router;